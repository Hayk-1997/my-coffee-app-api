const jwt = require('jsonwebtoken');
const errorMessage = require('../../../helpers/errorMessage');
const logs = require('../../../helpers/logs');
const secret = process.env.JWT_SECRET || 'devmode';

module.exports = function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      return errorMessage(res, null, 'User is not valid');
    } else {
      next();
    }
    logs(`Valid User _id:${decodedToken._id}`);
  } catch(e) {
    return errorMessage(res, null, e.message);
  }
};