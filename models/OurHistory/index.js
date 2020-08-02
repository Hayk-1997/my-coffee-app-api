const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

const fields = {
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
};

const OurHistorySchema = new Schema ({
  _id: {
    type: String,
    default: () => Guid.raw(),
  },
  en: {
    ...fields,
  },
  am: {
    ...fields,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

OurHistorySchema.pre('update', function (next) {
  this.updated_at = new Date().getTime();
  next();
});

module.exports = model('OurHistory', OurHistorySchema);