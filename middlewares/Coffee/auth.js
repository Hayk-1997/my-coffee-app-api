const jwt = require('jsonwebtoken');
const logs = require('../../helpers/logs');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

module.exports = function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('User is not valid');
    } else {
      logs(`Valid User _id:${decodedToken._id}`);
      next();
    }
  } catch(e) {
    throw new Error('User is not valid');
  }
};