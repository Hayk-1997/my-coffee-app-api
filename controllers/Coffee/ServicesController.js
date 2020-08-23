const mongoose = require('mongoose');
const ServiceModel = mongoose.model('Service');
const Log = require('../../helpers/winston-logger');

class ServicesController {
  async get () {
    try {
      Log.info('----Start ServicesController get----');
      const response = await ServiceModel.findOne();
      if (response._id) {
        Log.info(`----[ServicesController get Success]---- ${JSON.stringify(response)}`);
        return { ...response._doc };
      } else {
        Log.info('----[ServicesController get Error]----');
      }
    } catch (e) {
      Log.info(`----[ServicesController get:Error]----: ${JSON.stringify(e.message)}`);
      return { ...e.message };
    }
  }
}

module.exports = new ServicesController();