const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs');
const logs = require('../../../helpers/logs');
const transport = require('../../../config/Email');
require('dotenv').config();

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
  const user = this;
  user.updatedAt = new Date().getTime();
  if(user.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    const message = {
      from: process.env.BASE_EMAIL, // Sender address
      to: 'davo.abrahamyan.2017@gmail.com', // List of recipients
      subject: 'Design Your Model S | Tesla', // Subject line
      text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
    };
    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
    next();
  } else {
    next();
  }
});

UserSchema.methods.generateToken = function (cb) {
  const user = this;
  user.token = jwt.sign(user._id.toHexString(), secret);
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

UserSchema.statics.findByToken = function({ token }) {
  return new Promise((resolve, reject) => {
    try {
      const user = this;
      const decodedIdAndToken = jwt.verify(token, secret);
      user.findById(decodedIdAndToken._id, (err, user) => {
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

UserSchema.statics.findByCredentials = async function(email, password) {
  return await new Promise((resolve, reject) => {
    try {
      const user = this;
      return user.findOne({ email }, (err, doc) => {
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

module.exports = model('User', UserSchema);