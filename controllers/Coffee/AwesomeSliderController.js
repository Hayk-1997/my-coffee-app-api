const mongoose = require('mongoose');
const AwesomeSliderModel = mongoose.model('AwesomeSlider');
const logs = require('../../helpers/logs');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');


class AwesomeSliderController {
    // Get AwesomeSlider Data
    get (req, res) {
        try {
            const response = AwesomeSliderModel.findOne();
            debugger
            response.image =  123; // AwesomeSliderModel.URLAttribute(response.image);
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