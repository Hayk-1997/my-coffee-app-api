const mongoose = require('mongoose');
const AwesomeSliderModel = mongoose.model('AwesomeSlider');
const AbstractController = require('../AbstractController');
const logs = require('../../helpers/logs');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');


class AwesomeSliderController extends AbstractController {
    constructor(legs) {
        super(legs);
        this.legs = legs;
    }
    // Get AwesomeSlider Data
    async get (req, res) {
        try {
            const response = await AwesomeSliderModel.findOne();
            if (response._id) {
                return successMessage(res, null, 'success', response);
            } else {
                return errorMessage(res);
            }
        } catch (e) {
            logs(`Error on AwesomeSliderController get function: [${e.message}]`);
            return errorMessage(res, null, e.message);
        }
    }
}

module.exports = new AwesomeSliderController();