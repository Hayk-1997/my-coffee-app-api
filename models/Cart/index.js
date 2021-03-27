const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
  type: {
    type: String,
    required: true,
  }
});

module.exports = model('Cart', CartSchema);