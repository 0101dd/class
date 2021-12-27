import mongoose from 'mongoose'
// import validator from 'validator'

const Schema = mongoose.Schema

const productsSchema = new Schema({
  name: {
    type: String,
    required: [true, '輸入商品名稱'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, '輸入商品價格'],
    minlength: 1
  },
  description: {
    type: String,
    required: [true, '輸入商品說明'],
    unique: true
  },
  quantity: {
    type: Number,
    required: [true, '輸入商品庫存量'],
    minlength: 1
  }
}, { versionKey: false })

const products = mongoose.model('products', productsSchema)

export default products
