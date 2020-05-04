const jwt = require('jsonwebtoken');
const httpStatus = require('../../../helpers/httpStatus');
const logs = require('../../../helpers/logs');
const secret = process.env.JWT_SECRET || 'devmode';

module.exports = function auth(req, res, next) {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, secret);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw  new Error('Invalid user');
        } else {
            next();
        }
        logs(`Valid User _id:${decodedToken._id}`);
    } catch {
        res.status(httpStatus.OK).json({
            error: new Error('Invalid request!')
        });
    }
};