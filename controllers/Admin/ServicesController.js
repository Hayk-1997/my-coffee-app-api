const mongoose = require('mongoose');
const ServiceModel = mongoose.model('Service');
const download = require('image-downloader');
const validator = require('../../helpers/validate');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const Log = require('../../helpers/winston-logger');
const { iconUpdateValidation } = require('../../helpers/ValidationRules.js');

class ServicesController {
  async get (req, res) {
    try {
      Log.info('----Start ServicesController get----');
      const response = await ServiceModel.findOne();
      if (response._id) {
        Log.info(`----[ServicesController get Success]---- ${JSON.stringify(response)}`);
        return successMessage(res, null, 'success', response);
      } else {
        Log.info('----[ServicesController get Error]----');
        return errorMessage(res);
      }
    } catch (e) {
      Log.info(`----[ServicesController get:Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }

  async update(req, res) {
    try {
      Log.info('----Start ServicesController update----');
      const data = req.body;
      const services = await ServiceModel.findOne();
      if (services._id) {
        await ServiceModel.updateOne(data, (error) => {
          if (error) {
            Log.info('----ServicesController update:error----');
            Log.info(`----[Error]: ${JSON.stringify(error)}----`);
          } else {
            Log.info('----ServicesController update:success----');
          }
        });
        return successMessage(res, null, 'Services successfully updated');
      }
    } catch (e) {
      Log.info(`----[ServicesController update: Error]: ${JSON.stringify(e.message)}----`);
      return errorMessage(res, null, e.message);
    }
  }

  async uploadIcon(req, res) {
    try {
      Log.info('----Start ServicesController uploadIcon----');
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

      const services = await ServiceModel.findOne();
      const language = data.language;
      const field = data.field;
      data.icon.item.download_url = downloadIconUrl.filename;
      services[language][field].icon = data.icon;

      await ServiceModel.updateOne(services, (error, success) => {
        if (error) {
          Log.info(`----[ServicesController updateOne Error]: ${JSON.stringify(error)}----`);
        }
        Log.info(`----[ServicesController updateOne Success]: ${JSON.stringify(success)}----`);
      });
      return successMessage(res, null, 'Icon successfully uploaded');
    } catch (e) {
      Log.info(`----[ServicesController uploadIcon: Error]: ${JSON.stringify(e.message)}----`);

      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new ServicesController();