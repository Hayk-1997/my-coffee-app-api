const mongoose = require('mongoose');
const StaticCounter = mongoose.model('StaticCounter');
const Log = require('../../helpers/winston-logger');
const { errorMessage } = require('../../helpers/handleMessage');
const { successMessage } = require('../../helpers/handleMessage');

class StaticCounterController {
  async get (req, res) {
    try {
      Log.info('----Start StaticCounterController get----');
      const response = await StaticCounter.findOne();
      Log.info(`----[StaticCounterController get Success]---- ${JSON.stringify(response)}`);
      return successMessage(res, null, 'success', response);
    } catch (e) {
      Log.info(`----[StaticCounterController get:Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new StaticCounterController();