const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const { DB_HOST, DB_PORT, DB_NAME } = process.env
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/users', require('./api/users'))
app.use('/products', require('./api/products'))
app.use('/carts', require('./api/carts'))
app.use('/orders', require('./api/orders'))
app.use('/dashboard', require('./api/isAdminUser'))

app.listen(3500, () => {
  console.log('Server running on port : 3500')
})
mongoose.connection.once('open', () => {
  console.log('Connected to mongodb...')
})
