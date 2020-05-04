const mongoose = require('mongoose');
const SocialLoginModel = mongoose.model('SocialLogin');
const httpStatus = require('../../helpers/httpStatus');
const logs = require('../../helpers/logs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'devmode';
const moment = require('moment');

class CoffeeAuthController  {

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
                    })
                } else {
                    logs(`User login with ${user._profile.email}::[${created._id}]`);
                    logs(`Logged user [${user.email}]`);
                    let token = jwt.sign({
                        _id: user._id,
                        expires: moment().add(7, 'days').valueOf()
                    }, secret);
                    res.json({ token });
                }
            })
        } catch (e) {
            logs(`Error on SocialLogin [${e.message}]`);
            res.status(httpStatus.UNAUTHORIZED).json({
                message: e.message,
                status: httpStatus.UNAUTHORIZED
            })
        }
    }
};
module.exports = new CoffeeAuthController();