const mongoose = require('mongoose');
const InfoModel = mongoose.model('Info');
const Log = require('../../helpers/winston-logger');

class InfoController {
  // Get Info Data
  async get() {
    try {
      Log.info('----Start InfoController get----');
      const response = await InfoModel.findOne();
      if (response._id) {
        Log.info(`----[InfoModel get success]---- ${JSON.stringify(response)}`);
        return { ...response._doc };
      } else {
        Log.info('----[InfoModel get error]----');
      }
    } catch (e) {
      Log.info('----InfoController get:[Catch Error]----');
      Log.info(`----[Error]---- ${JSON.stringify(e.message)}`);
      return { ...e.message };
    }
  }
}

module.exports = new InfoController();