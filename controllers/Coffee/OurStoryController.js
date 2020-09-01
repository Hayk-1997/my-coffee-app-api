const mongoose = require('mongoose');
const OurStory = mongoose.model('OurStory');
const Log = require('../../helpers/winston-logger');
const { getImageFullPath } = require('../../helpers/motations');

class OurStoryController {
  async get () {
    try {
      Log.info('----Start OurStoryController get----');
      const response = await OurStory.findOne();
      if (response._id) {
        response.image = getImageFullPath(response.image);
        Log.info(`----[OurStoryController.get Success]---- ${JSON.stringify(response)}`);
        return { ...response._doc };
      }
    } catch (e) {
      Log.info('----OurStoryController get:[Catch Error]----');
      Log.info(`----[Error]----: ${JSON.stringify(e.message)}`);
      return { ...e.message };
    }
  }
}

module.exports = new OurStoryController();