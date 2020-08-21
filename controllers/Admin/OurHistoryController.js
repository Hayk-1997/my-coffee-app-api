const mongoose = require('mongoose');
const OurHistoryModel = mongoose.model('OurHistory');
const Log = require('../../helpers/winston-logger');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const { setImagePath, getImageFullPath } = require('../../helpers/motations');
const validator = require('../../helpers/validate');
const fs = require('fs-extra');
const { ourHistoryUpdate } = require('../../helpers/ValidationRules.js');

class OurHistoryController {
  async get (req, res) {
    try {
      Log.info('----Start OurHistoryController get----');
      const response = await OurHistoryModel.findOne();
      if (response._id) {
        response.image = getImageFullPath(response.image);
        Log.info(`----[OurHistoryController get Success]---- ${JSON.stringify(response)}`);
        return successMessage(res, null, 'success', response);
      }
    } catch (e) {
      Log.info(`----[OurHistoryController get: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }

  async update (req, res) {
    try {
      Log.info('----Start OurHistoryController update----');
      const data = JSON.parse(req.body.form);
      validator(data, ourHistoryUpdate, {}, (err, status) => {
        if (!status) {
          return errorMessage(res, null, err);
        }
      });
      if (req.file) {
        data.image = setImagePath(req.file.destination, req.file.filename);
      }
      // Update Getting data
      const response = await OurHistoryModel.findOne();
      if (response._id) {
        await OurHistoryModel.updateOne(data, (error) => {
          if (error) {
            return errorMessage(res);
          }
          if (fs.existsSync(response.image) && response.id && req.file) {
            fs.unlinkSync(response.image);
          }
          return successMessage(res, null, 'Our History updated successfully');
        });
      } else {
        return errorMessage(res);
      }
    } catch (e) {
      Log.info(`----[OurHistoryController update: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new OurHistoryController();