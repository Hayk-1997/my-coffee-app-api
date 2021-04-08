const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const type = {
  label: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
  }
}
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quantity: {
    type: String,
    required: true,
    default: '1',
  },
  product:  {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  type: type
});

module.exports = model('Cart', CartSchema);