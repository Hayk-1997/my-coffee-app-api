const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Guid = require('guid');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const { Schema, model } = mongoose;
const logs = require('../../../helpers/logs');

// filter returned values on requests
const returnFilter = (obj) => {
  const tmp = { ...obj };
  tmp.password = undefined;
  tmp.__v = undefined;
  return tmp;
};

const AdminSchema = new Schema({
  _id: {
    type: String,
    default: () => Guid.raw()
  },
  email: {
    type     : String,
    required : true,
    unique   : true,
    uniqueCaseInsensitive: true,
    trim     : true,
    minlength: 5,
    validate : {
      validator: (value) => validator.isEmail(value),
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type     : String,
    trim     : true,
    required : true,
    minlength: 6
  },
  updated_at: {
    type: Date,
    default: new Date().getTime()
  },
  created_at: {
    type: Date,
    default: new Date().getTime()
  }
});

AdminSchema.plugin(uniqueValidator);

AdminSchema.pre('save', function (next) {
  const user = this;
  user.updated_at = new Date().getTime();

  if(user.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  } else {
    next();
  }
});

AdminSchema.pre('update', function (next) {
  const user = this;
  this.updated_at = new Date().getTime();
  next();
});

AdminSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return returnFilter(userObject);
};

AdminSchema.statics.returnFilter = returnFilter;

AdminSchema.statics.findByCredentials = async function (email, password) {
  const admin = this;
  return new Promise(async (resolve, reject) => {
    try {
      admin.findOne({ email }, (err, doc) => {
        if(err || !doc) {
          return reject({ status: 404, message: 'Invalid credentials' });
        }
        bcrypt.compare(password, doc.password, (err, didMatch) => {
          if(err) return reject(err);
          if(didMatch) {
            resolve(doc);
          } else {
            reject({ message: 'Not authorized' });
          }
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

AdminSchema.statics.findByToken = function({ token }) {
  return new Promise((resolve, reject) => {
    try {
      const Admin = this;
      const decodedIdAndToken = jwt.verify(token, secret);
      Admin.findById(decodedIdAndToken._id, (err, user) => {
        if (err) {
          return reject(err);
        }
        return resolve(user);
      });
    } catch (e) {
      logs(`Error on findByToken [${e.message}]`);
      return reject(e);
    }
  });
};

module.exports = model('Admin', AdminSchema);