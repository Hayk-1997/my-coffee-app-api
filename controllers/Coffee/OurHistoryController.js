const mongoose = require('mongoose');
const OurHistoryModel = mongoose.model('OurHistory');
const Log = require('../../helpers/winston-logger');
const { getImageFullPath } = require('../../helpers/motations');

class OurHistoryController {
  async get () {
    try {
      Log.info('----Start OurHistoryController get----');
      const response = await OurHistoryModel.findOne();
      if (response._id) {
        response.image = getImageFullPath(response.image);
        Log.info(`----[OurHistoryController.get Success]---- ${JSON.stringify(response)}`);
        return { ...response._doc };
      }
    } catch (e) {
      Log.info('----OurHistoryController get:[Catch Error]----');
      Log.info(`----[Error]----: ${JSON.stringify(e.message)}`);
      return { ...e.message };
    }
  }
}

module.exports = new OurHistoryController();