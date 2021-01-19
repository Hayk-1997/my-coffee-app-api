const mongoose = require('mongoose');
const Info = mongoose.model('Info');
const download = require('image-downloader');
const validator = require('../../helpers/validate');
const { errorMessage } = require('../../helpers/handleMessage');
const { successMessage } = require('../../helpers/handleMessage');
const Log = require('../../helpers/winston-logger');
const { iconUpdateValidation, infoUpdateValidation } = require('../../helpers/ValidationRules.js');

class InfoController {
  async uploadIcon(req, res) {
    try {
      Log.info('----Start InfoController uploadIcon----');
      const data = req.body;

      validator(data, iconUpdateValidation, {}, (err, status) => {
        if (!status) {
          return errorMessage(res, null, err);
        }
      });

      const __DIR__ = './public/uploads/icons/';
      const options = {
        url: data.icon.item.preview_url,
        dest: __DIR__
      };

      const downloadIconUrl = await download.image(options)
        .then((filename) => {
          Log.info('Download Filename: ' + JSON.stringify(filename));
          return filename;
        })
        .catch((err) => {
          Log.info('Download Error: ' + JSON.stringify(err));
          return err;
        });

      const infoData = await Info.findOne();
      const language = data.language;
      const field = data.field;
      data.icon.item.download_url = downloadIconUrl.filename;
      infoData[language][field].icon = data.icon;

      await Info.updateOne(infoData, (error, success) => {
        if (error) {
          Log.info(`----[InfoController updateOne Error]: ${JSON.stringify(error)}----`);
        }
        Log.info(`----[InfoController updateOne Success]: ${JSON.stringify(success)}----`);
      });

      return successMessage(res, null, 'Icon successfully uploaded');
    } catch (e) {
      Log.info(`----[InfoController uploadIcon: Error]: ${JSON.stringify(e.message)}----`);

      return errorMessage(res, null, e.message);
    }
  }

  async update(req, res) {
    try {
      Log.info('----Start InfoController update----');
      const data = req.body;
      validator(data, infoUpdateValidation, {}, (error, success) => {
        if (!success) { return errorMessage(res, null, error); }
      });
      await Info.updateOne(data, (error) => {
        if (error) {
          return errorMessage(res);
        }
        return successMessage(res, null, 'Info successfully updated');
      });
    } catch (e) {
      Log.info(`----[InfoController update: Error]: ${JSON.stringify(e.message)}----`);
      return errorMessage(res, null, e.message);
    }
  }

  async get(req, res) {
    try {
      Log.info('----Start InfoController get----');
      const response = await Info.findOne();
      if (response._id) {
        Log.info(`----[InfoController get Success]---- ${JSON.stringify(response)}`);
        return successMessage(res, null, 'success', response);
      } else {
        Log.info('----[InfoController get Error]----');
        return errorMessage(res);
      }
    } catch (e) {
      Log.info(`----[InfoController get: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}
module.exports = new InfoController();