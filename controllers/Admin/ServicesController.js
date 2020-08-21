const mongoose = require('mongoose');
const ServiceModel = mongoose.model('Service');
const download = require('image-downloader');
const validator = require('../../helpers/validate');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const Log = require('../../helpers/winston-logger');


class ServicesController {
  async get (req, res) {
    try {
      Log.info('----Start ServicesController get----');
      const response = await ServiceModel.findOne();
      if (response._id) {
        Log.info(`----[ServicesController.get Success]---- ${JSON.stringify(response)}`);
        return successMessage(res, null, 'success', response);
      } else {
        Log.info('----[ServicesController.get Error]----');
        return errorMessage(res);
      }
    } catch (e) {
      Log.info('----ServicesController get:[Catch Error]----');
      Log.info(`----[Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new ServicesController();