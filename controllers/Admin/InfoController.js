const mongoose = require('mongoose');
const InfoModel = mongoose.model('Info');
const download = require('image-downloader');
const validator = require('../../helpers/validate');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const Log = require('../../helpers/winston-logger');

class InfoController {
  async uploadIcon(req, res) {
    try {
      Log.info('----Start InfoController uploadIcon----');
      const validationRule = {
        'icon.item.download_url': 'required|string',
        'icon.item.format': 'required|string',
        'icon.item.preview_url': 'required|string',
        'icon.size': 'required|numeric',
        'field': 'required|string',
        'language': 'required|string',
      };
      const data = req.body;
      validator(data, validationRule, {}, (err, status) => {
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
      const infoData = await InfoModel.findOne();
      const language = data.language;
      const field = data.field;
      data.icon.item.download_url = downloadIconUrl.filename;
      infoData[language][field].icon = data.icon;
      const updatedInfoIcon = await InfoModel.updateOne(infoData, (error, success) => {
        if (error) {
          Log.info(`----[InfoModel.updateOne Error]: ${JSON.stringify(error)}----`);
        }
        Log.info(`----[InfoModel.updateOne Success]: ${JSON.stringify(success)}----`);
      });
      res.send({ message: updatedInfoIcon });
    } catch (e) {
      Log.info('----InfoController uploadIcon:[Catch Error]----');
      Log.info(`----[Error]: ${JSON.stringify(e.message)}----`);
      return errorMessage(res, null, e.message);
    }
  }

  async update(req, res) {
    try {
      Log.info('----Start InfoController update----');
      const validationRule = {
        'en.phone.number': 'required|string',
        'en.phone.description': 'required|string',
        'en.phone.icon.item.download_url': 'required|string',
        'en.phone.icon.item.format': 'required|string',
        'en.phone.icon.item.preview_url': 'required|string',
        'en.phone.icon.size': 'required|numeric',
        'en.address.title': 'required|string',
        'en.address.description': 'required|string',
        'en.address.icon.item.format': 'required|string',
        'en.address.icon.item.preview_url': 'required|string',
        'en.address.icon.size': 'required|numeric',
        'en.workingHours.title': 'required|string',
        'en.workingHours.description': 'required|string',
        'en.workingHours.icon.item.format': 'required|string',
        'en.workingHours.icon.item.preview_url': 'required|string',
        'en.workingHours.icon.size': 'required|numeric',
        'am.phone.number': 'required|string',
        'am.phone.description': 'required|string',
        'am.phone.icon.item.download_url': 'required|string',
        'am.phone.icon.item.format': 'required|string',
        'am.phone.icon.item.preview_url': 'required|string',
        'am.phone.icon.size': 'required|numeric',
        'am.address.title': 'required|string',
        'am.address.description': 'required|string',
        'am.address.icon.item.download_url': 'required|string',
        'am.address.icon.item.format': 'required|string',
        'am.address.icon.item.preview_url': 'required|string',
        'am.address.icon.size': 'required|numeric',
        'am.workingHours.title': 'required|string',
        'am.workingHours.description': 'required|string',
        'am.workingHours.icon.item.download_url': 'required|string',
        'am.workingHours.icon.item.format': 'required|string',
        'am.workingHours.icon.item.preview_url': 'required|string',
        'am.workingHours.icon.size': 'required|numeric',
      };

      const data = req.body;
      validator(data, validationRule, {}, (error, success) => {
        if (!success) { return errorMessage(res, null, error); }
      });

      const info = await InfoModel.findOne();
      if (info._id) {
        const updatedInfo = await InfoModel.updateOne(data, (error, success) => {
          if (error) {
            Log.info('----InfoController update: [Error]----');
            Log.info(`----[Error]: ${JSON.stringify(error)}----`);
          } else {
            Log.info('----InfoController update:Success----');
          }
        });
        res.send({ messages: updatedInfo });
      }
    } catch (e) {
      Log.info('----InfoController update:[Catch Error]----');
      Log.info(`----[Error]: ${JSON.stringify(e.message)}----`);
      return errorMessage(res, null, e.message);
    }
  }

  async get(req, res) {
    try {
      Log.info('----Start InfoController get----');
      const response = await InfoModel.findOne();
      if (response._id) {
        Log.info(`----[InfoController.get Success]---- ${JSON.stringify(response)}`);
        return successMessage(res, null, 'success', response);
      } else {
        Log.info('----[InfoController.get Error]----');
        return errorMessage(res);
      }
    } catch (e) {
      Log.info('----InfoController get:[Catch Error]----');
      Log.info(`----[Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}
module.exports = new InfoController();