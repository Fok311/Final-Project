const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: String, require: true },
  description: { type: String, require: true },
  quantity: { type: Number, required: true },
  image: { type: String },
  isActive: { type: String, default: true }
})

module.exports = mongoose.model('Product', ProductSchema)
