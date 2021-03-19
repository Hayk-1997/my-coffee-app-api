const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const fields = {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
};

const ProductSchema = new Schema({
  en: { ...fields },
  am: { ...fields },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
  },
  rate: {
    type: String,
  },
  thumbnail: [
    {
      type: String,
      required: true,
    }
  ],
  slug: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }
  ]
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

module.exports = model('Product', ProductSchema);