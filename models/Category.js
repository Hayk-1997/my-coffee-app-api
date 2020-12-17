const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

const CategorySchema = new Schema({
  _id: {
    type: String,
    default: () => Guid.raw(),
  },
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
}, {
  timestamp: true,
});

module.exports = model('Category', CategorySchema);