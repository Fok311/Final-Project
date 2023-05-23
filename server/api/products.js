const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/auth')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

//get products
router.get('/', async (req, res) => {
  try {
    let products = await Product.find()
    return res.json(products)
  } catch (e) {
    return res.json({ e, msg: 'Cannot get products' })
  }
})

//get product by id
router.get('/', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)
    return res.json(product)
  } catch (e) {
    return res.json({ e, msg: 'Cannot get product' })
  }
})

//add product
router.post('/', auth, upload.single('image'), (req, res) => {
  try {
    if (req.user.isAdmin) {
      let product = new Product(req.body)
      product.image = 'public/' + req.file.filename
      product.save()
      return res.json({ product, msg: 'Successfully added product' })
    } else {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to add product' })
    }
  } catch (e) {
    return res.status(400).json({ error: e })
  }
})

//update product
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.json({ msg: 'No product found' })

    if (!req.user.isAdmin)
      return res
        .status(401)
        .json({ msg: 'You are not authorized to update this product' })

    let currentProduct = await Product.findById(req.params.id)

    let product = await Product.findByIdAndUpdate(req.params.id, {
      ...req.body,
      image: req.file ? 'public/' + req.file.filename : currentProduct.image
    })

    return res.json({ msg: 'Product has been updated' })
  } catch (e) {
    return res.json({ e, msg: 'Cannot update this product' })
  }
})

//delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.json({ msg: 'No product found' })

    if (req.user.isAdmin) {
      const product = await Product.findById(req.params.id)
      const filename = product.image
      const filepath = path.join(__dirname, '../' + filename)
      fs.unlinkSync(filepath)
      await Product.findByIdAndDelete(product._id)
      return res.json({ product, msg: 'Successfully deleted !' })
    } else {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to delete product' })
    }
  } catch (e) {
    return res.status(400).json({ error: e })
  }
})
module.exports = router
