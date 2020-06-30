const mongoose = require('mongoose');
const AwesomeSliderModel = mongoose.model('AwesomeSlider');
const { getImageFullPath } = require('../../helpers/motations');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const Log = require('../../helpers/winston-logger');

class AwesomeSliderController {
    // Get AwesomeSlider Data
    async get (req, res) {
        try {
            Log.info('----Start AwesomeSliderController get----');
            const response = await AwesomeSliderModel.findOne();
            if (response._id) {
                response.image = getImageFullPath(response.image);
                return successMessage(res, null, 'success', response);
            } else {
                Log.info(`----[AwesomeSliderController.get Success]: ${JSON.stringify(response)}----`);
                return errorMessage(res);
            }
        } catch (e) {
            Log.info('----AwesomeSliderController get:[Catch Error]----');
            Log.info(`----[Error]: ${JSON.stringify(e.message)}----`);
            return errorMessage(res, null, e.message);
        }
    }
}

module.exports = new AwesomeSliderController();