const mongoose = require('mongoose');
const OurStory = mongoose.model('OurStory');
const Log = require('../../helpers/winston-logger');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const { setImagePath, getImageFullPath } = require('../../helpers/motations');
const validator = require('../../helpers/validate');
const fs = require('fs-extra');
const { ourHistoryUpdateValidation } = require('../../helpers/ValidationRules.js');

class OurStoryController {
  async get (req, res) {
    try {
      Log.info('----Start OurHistoryController get----');
      const response = await OurStory.findOne();
      if (response._id) {
        response.image = getImageFullPath(response.image);
        Log.info(`----[OurStoryController get Success]---- ${JSON.stringify(response)}`);
        return successMessage(res, null, 'success', response);
      }
    } catch (e) {
      Log.info(`----[OurStoryController get: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }

  async update (req, res) {
    try {
      Log.info('----Start OurStoryController update----');
      const data = JSON.parse(req.body.form);
      validator(data, ourHistoryUpdateValidation, {}, (error) => {
        if (error) {
          return errorMessage(res, null, error);
        }
      });
      if (req.file) {
        data.image = setImagePath(req.file.destination, req.file.filename);
      }
      const response = await OurStory.findOne();
      await OurStory.updateOne(data, (error) => {
        if (error) {
          return errorMessage(res);
        }
        if (fs.existsSync(response.image) && response.id && req.file) {
          fs.unlinkSync(response.image);
        }
        return successMessage(res, null, 'Our Story successfully updated');
      });
    } catch (e) {
      Log.info(`----[OurStoryController update: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new OurStoryController();