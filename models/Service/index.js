const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

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
    }
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

const fields = {
  box1: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: { ...icon },
  },
  box2: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: { ...icon },
  },
  box3: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: { ...icon },
  },  
};

const ServiceSchema = new Schema({
  _id: {
    type: String,
    default: () => Guid.raw(),
  },
  en: {
    ...fields,
  },
  am: {
    ...fields,
  }
}, {
  timestamp: true,
});

ServiceSchema.pre('update', function (next) {
  this.updated_at = new Date().getTime();
  next();
});

module.exports = model('Service', ServiceSchema);
