const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const icon = {
  item: {
      download_url: {
          type: String,
          required: true,
      },
      format: {
          type: String,
          required: true,
      },
      preview_url: {
          type: String,
          required: true,
      },
  },
    size: {
        type: Number,
        required: true,
    },
    tags: {
      type: Array,
      required: true,
    }
};

const initialFields = {
    phone: {
        number: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
       icon
    },
    address: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon
    },
    workingHours: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon
    },
};

const InfoSchema = new Schema({
    en: {
        ...initialFields
    },
    arm: {
        ...initialFields
    },
}, {
    timestamp: true
});

module.exports = model('Info', InfoSchema);