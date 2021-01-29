const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  am: {
    title: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  en: {
    title: {
      type: String,
    },
    description: {
      type: String,
    }
  },
}, {
  timestamp: true,
});

module.exports = model('Category', CategorySchema);