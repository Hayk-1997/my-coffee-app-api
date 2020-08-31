const mongoose = require('mongoose');
const OurMenu = mongoose.model('OurMenu');
const Log = require('../../helpers/winston-logger');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const { setImagePath } = require('../../helpers/motations');
const fs = require('fs-extra');

class OurMenuController {
  async get (req, res) {
    try {
      Log.info('----Start OurMenuController get----');
      const ourMenu = await OurMenu.findOne();
      Log.info('----[OurMenuController get Success]----');
      return successMessage(res, null, 'success', ourMenu);
    } catch (e) {
      Log.info(`----[OurMenuController get: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }

  async update (req, res) {
    try {
      Log.info('----Start OurMenuController update----');
      const data = req.body;
      await OurMenu.updateOne(data, (error) => {
        if (error) {
          return errorMessage(res);
        }
        return successMessage(res, null, 'Our Menu successfully updated');
      });
    } catch (e) {
      Log.info(`----[OurMenuController update: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }

  async uploadImage (req, res) {
    try {
      Log.info('----Start OurMenuController uploadImage----');
      const { lang, field } = req.body;
      let image = '';
      if (req.file) {
        image = setImagePath(req.file.destination, req.file.filename);
      }
      const response = await OurMenu.findOne();
      const data = JSON.parse(JSON.stringify(response._doc));
      data[lang][field].image = image;
      if (response._id) {
        await OurMenu.updateOne(data, (error) => {
          if (error) {
            return errorMessage(res);
          }
          if (fs.existsSync(response[lang][field].image) && response._id && req.file) {
            fs.unlinkSync(response[lang][field].image);
          }
          return successMessage(res, null, 'Image successfully uploaded');
        });
      }
    } catch (e) {
      Log.info(`----[OurMenuController uploadImage: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new OurMenuController();