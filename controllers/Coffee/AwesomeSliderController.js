const mongoose = require('mongoose');
const AwesomeSliderModel = mongoose.model('AwesomeSlider');
const { getImageFullPath } = require('../../helpers/motations');
const Log = require('../../helpers/winston-logger');

class AwesomeSliderController {
    // Get AwesomeSlider Data
    async get () {
        try {
            Log.info('----Start AwesomeSliderController get----');
            const response = await AwesomeSliderModel.findOne();
            if (response._id) {
                response.image = getImageFullPath(response.image);
                return { ...response._doc };
            } else {
                Log.info(`----[AwesomeSliderController.get Success]---- ${JSON.stringify(response)}`);
            }
        } catch (e) {
            Log.info('----AwesomeSliderController get:[Catch Error]----');
            Log.info(`----[Error]---- ${JSON.stringify(e.message)}`);
            return { ...e.message };
        }
    }
}

module.exports = new AwesomeSliderController();