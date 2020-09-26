const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

const StaticCounterSchema = new Schema({
  _id: {
    type: String,
    default: () => Guid.raw(),
  },
  coffeeBranches: {
    type: String,
    required: true,
  },
  awards: {
    type: String,
    required: true,
  },
  customers: {
    type: String,
    required: true,
  },
  staffs: {
    type: String,
    required: true,
  },
}, {
  timeStamp: true
});

StaticCounterSchema.pre('update', function (next) {
  this.updated_at = new Date().getTime();
  next();
});

module.eports = model('StaticCounter', StaticCounterSchema);