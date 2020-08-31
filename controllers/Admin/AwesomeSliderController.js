const mongoose = require('mongoose');
const AwesomeSliderModel = mongoose.model('AwesomeSlider');
const { setImagePath, getImageFullPath } = require('../../helpers/motations');
const logs = require('../../helpers/logs');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const validator = require('../../helpers/validate');
const fs = require('fs-extra');
const { ourHistoryUpdateValidation } = require('../../helpers/ValidationRules.js');
const Log = require('../../helpers/winston-logger');

class AwesomeSliderController {
  async get (req, res) {
    try {
      const response = await AwesomeSliderModel.findOne();
      if (response._id) {
        response.image = getImageFullPath(response.image);
        return successMessage(res, null, 'success', response);
      } else {
        return errorMessage(res);
      }
    } catch (e) {
      logs(`Error on AwesomeSliderController get function: [${e.message}]`);
      return errorMessage(res, null, e.message);
    }
  }

  async update (req, res) {
    try {
      Log.info('----Start AwesomeSliderController update----');
      const data = JSON.parse(req.body.form);
      validator(data, ourHistoryUpdateValidation, {}, (error) => {
        if (!status) {
          return errorMessage(res, null, error);
        }
      });
      if (req.file) {
        data.image = setImagePath(req.file.destination, req.file.filename);
      }

      const response = await AwesomeSliderModel.findOne();
      if (response._id) {
        await AwesomeSliderModel.updateOne(data, (error) => {
          if (error) {
            return errorMessage(res);
          }
          if (fs.existsSync(response.image) && response.id && req.file) {
            fs.unlinkSync(response.image);
          }
          return successMessage(res, null, 'Awesome Slider successfully updated');
        });
      } else {
        return errorMessage(res);
      }
    } catch (e) {
      Log.info(`----[AwesomeSliderController update: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new AwesomeSliderController();