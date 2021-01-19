const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const { successMessage } = require('../../helpers/handleMessage');
const { errorMessage } = require('../../helpers/handleMessage');
const Log = require('../../helpers/winston-logger');

class CategoryController {
  async get (req, res) {
    try {
      Log.info('----Start CategoryController get----');
      const response = await Category.find({}).populate('products');
      return successMessage(res, null, 'success', response);
    } catch (e) {
      Log.info(`----[CategoryController get: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
  async onlyCategories (req, res) {
    try {
      Log.info('----Start onlyCategories get----');
      const response = await Category.find({}).select('_id, name');
      return successMessage(res, null, 'success', response);
    } catch (e) {
      Log.info(`----[onlyCategories get: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new CategoryController();