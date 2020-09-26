const mongoose = require('mongoose');
const StaticCounter = mongoose.model('StaticCounter');
const Log = require('../../helpers/winston-logger');

class StaticCounterController {
  async get () {
    try {
      Log.info('----Start StaticCounterController get----');
      const response = await StaticCounter.findOne();
      Log.info(`----[StaticCounterController get Success]---- ${JSON.stringify(response)}`);
      return { ...response._doc };
    } catch (e) {
      Log.info(`----[StaticCounterController get:Error]----: ${JSON.stringify(e.message)}`);
      return { ...e.message };
    }
  }
}

module.exports = new StaticCounterController();