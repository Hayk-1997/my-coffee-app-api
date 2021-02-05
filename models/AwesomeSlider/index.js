const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');
// New Schema
const AwesomeSliderSchema = new Schema({
  _id: {
    type: String,
    default: () => Guid.raw(),
  },
  en: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  am: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

module.exports = model('AwesomeSlider', AwesomeSliderSchema);