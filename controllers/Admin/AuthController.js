const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const httpStatus = require('../../helpers/httpStatus');
const logs = require('../../helpers/logs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

class AuthController {
  async login (req, res) {
    if (!req.body) {
      return res.status(httpStatus.NO_CONTENT).send();
    }
    try {
      const admin = await Admin.findByCredentials(req.body.email, req.body.password);
      if (admin && admin._id) {
        const token = jwt.sign({
          _id: admin._id,
          expires: moment().add(1, 'days').valueOf()
        }, secret);
        await res.json({ token });
      }
    } catch (e) {
      logs(`Error on AuthController login function [${e.message}]`);
      res.status(httpStatus.UNAUTHORIZED).json({
        status: httpStatus.UNAUTHORIZED,
        message: e.message
      });
    }
  }

  async register (req, res) {
    if (!req.body) {
      return res.status(httpStatus.NO_CONTENT).send();
    }
    const admin = { ...req.body };
    try {
      await Admin.create(admin, (err, created) => {
        if (err) {
          logs(`Error on create user [${admin.email}]. Error: ..:: ${err.message} ::..`, 'error');
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: err.message
          });
        } else {
          logs(`Created Admin [${created._id}]`);
          res.status(httpStatus.CREATED).json({
            'adminId':created._id,
          });
        }

      });
    } catch (e) {
      logs(`Error on AuthController create user [${admin.email}]. Error: ..:: ${e.message} ::..`, 'error');
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'httpStatus.INTERNAL_SERVER_ERROR',
        error: e.message
      });
    }
  }

  async verifyAdminToken (req, res) {
    try {
      if (!req.body) {
        return res.status(httpStatus.NO_CONTENT).send();
      } else {
        const admin = await Admin.findByToken(req.body);
        res.status(httpStatus.OK).json({
          'admin': admin._id
        });
      }
    } catch (e) {
      logs(`Error on AuthController verifyAdminToken [${e.message}]`);
      res.status(httpStatus.NETWORK_AUTHENTICATION_REQUIRED).json({
        status: httpStatus.NETWORK_AUTHENTICATION_REQUIRED,
        message: e.message,
      });
    }
  }
}

module.exports = new AuthController();