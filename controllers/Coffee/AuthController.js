const mongoose = require('mongoose');
const SocialLoginModel = mongoose.model('SocialLogin');
const User = mongoose.model('User');
const httpStatus = require('../../helpers/httpStatus');
const logs = require('../../helpers/logs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'devmode';
const moment = require('moment');
const Log = require('../../helpers/winston-logger');
const { registerValidator } = require('../../helpers/validators/register');
const validator = require('../../helpers/validate');

class AuthController {
  async register (request) {
    try {
      Log.info('----Start CoffeeAuthController register----');
      validator(request, registerValidator, {}, (error) => error);
      const response = await User.create(request);
      const token = jwt.sign({
        _id: response._id,
        expires: moment().add(50, 'minutes').valueOf()
      }, secret);
      return Object.assign(response, { token });
    } catch (e) {
      Log.info(`----[CoffeeAuthController register: Error]----: ${JSON.stringify(e.message)}`);
      throw new Error(e);
    }
  }

  async login(request) {
    try {
      Log.info('----Start CoffeeAuthController login----');
      const user = await User.findByCredentials(request.email, request.password);
      if (user._id) {
        const token = jwt.sign({
          _id: user._id,
          expires: moment().add(1, 'days').valueOf()
        }, secret);
        return await ({ token });
      }
    } catch (e) {
      Log.info(`----[CoffeeAuthController login: Error]----: ${JSON.stringify(e.message)}`);
      throw new Error(e.message);
    }
  }
  async socialLogin (req, res) {
    // Login user with Social Login
    if (!req.body) {
      return res.status(httpStatus.NO_CONTENT).send();
    }
    const user = {...req.body};
    try {
      await SocialLoginModel.create(user, (err, created) => {
        if (err) {
          logs(`Error on create user [${user._profile.email}]. Error: ..:: ${err.message} ::..`, 'error');
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: err.message
          });
        } else {
          logs(`User login with ${user._profile.email}::[${created._id}]`);
          logs(`Logged user [${user.email}]`);
          const token = jwt.sign({
            _id: user._id,
            expires: moment().add(7, 'days').valueOf()
          }, secret);
          res.json({token});
        }
      });
    } catch (e) {
      logs(`Error on SocialLogin [${e.message}]`);
      res.status(httpStatus.UNAUTHORIZED).json({
        message: e.message,
        status: httpStatus.UNAUTHORIZED
      });
    }
  }
}

module.exports = new AuthController();