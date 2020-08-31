const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

const fields = {
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
};

const OurMenuSchema = new Schema({
  _id: {
    type: String,
    default: () => Guid.raw(),
  },
  en : {
    description: {
      type: String,
      required: true,
    },
    card1: { ...fields },
    card2: { ...fields },
    card3: { ...fields },
    card4: { ...fields },
  },
  am: {
    description: {
      type: String,
      required: true,
    },
    card1: { ...fields },
    card2: { ...fields },
    card3: { ...fields },
    card4: { ...fields },
  },
}, {
  timestamp: true,
});

OurMenuSchema.pre('update', function (next) {
  this.updated_at = new Date().getTime();
  next();
});

module.exports = model('OurMenu', OurMenuSchema);