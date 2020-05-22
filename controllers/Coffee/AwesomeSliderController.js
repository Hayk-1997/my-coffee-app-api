const mongoose = require('mongoose');
const AwesomeSliderModel = mongoose.model('AwesomeSlider');
const { getImageFullPath } = require('../../helpers/motations');
const logs = require('../../helpers/logs');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');


class AwesomeSliderController {
    // Get AwesomeSlider Data
    async get (req, res) {
        try {
            const response = await AwesomeSliderModel.findOne();
            if (response._id) {
                response.image = getImageFullPath(response.image);
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