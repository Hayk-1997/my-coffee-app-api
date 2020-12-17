const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

const ProductSchema = new Schema({
  _id: {
    type: String,
    default: () => Guid.raw(),
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  rate: {
    type: Number,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ]
}, {
  timestamp: true,
});

module.exports = model('Product', ProductSchema);