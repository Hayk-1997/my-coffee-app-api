const mongoose = require('mongoose');
const OurMenu = mongoose.model('OurMenu');
const Log = require('../../helpers/winston-logger');

class OurMenuController {
  async get () {
    try {
      Log.info('----Start OurMenuController get----');
      const response = await OurMenu.findOne();
      Log.info('----[OurMenuController get Success]----');
      return { ...response._doc };
    } catch (e) {
      Log.info(`----[OurMenuController get: Error]----: ${JSON.stringify(e.message)}`);
      return { ...e.message };
    }
  }
}

module.exports = new OurMenuController();