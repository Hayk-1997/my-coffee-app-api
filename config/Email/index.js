const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abrahamyanhayk01@gmail.com',
    pass: 'qwerty1997'
  }
});