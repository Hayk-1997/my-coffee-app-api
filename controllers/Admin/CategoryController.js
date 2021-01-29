const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Product = mongoose.model('Product');
const { successMessage } = require('../../helpers/handleMessage');
const { errorMessage } = require('../../helpers/handleMessage');
const Log = require('../../helpers/winston-logger');

class CategoryController {
  async get (req, res) {
    try {
      Log.info('----Start CategoryController get----');
      const response = await Category.find().populate('products');
      return successMessage(res, null, 'success', response);
    } catch (e) {
      Log.info(`----[CategoryController get: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
  async onlyCategories (req, res) {
    try {
      Log.info('----Start CategoryController onlyCategories----');
      const response = await Category.find({}).select('_id, name');
      return successMessage(res, null, 'success', response);
    } catch (e) {
      Log.info(`----[CategoryController onlyCategories: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }

  async create (req, res) {
    try {
      Log.info('----Start CategoryController create----');
      const data = req.body;
      await Category.create(data, (error) => {
        if (error) {
          return errorMessage(res, null, error.message);
        }
        return successMessage(res, null, 'Category successfully created');
      });
    } catch (e) {
      Log.info(`----[CategoryController create: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }


  async categoryProducts (req, res) {
    try {
      Log.info('----Start CategoryController categoryProducts----');
      const categoryId = req.params.id;
      const response = await Product.find({ categories: { $in: categoryId } }).populate('categories');
      return successMessage(res, null, 'success', response);
    } catch (e) {
      Log.info(`----[CategoryController categoryProducts: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new CategoryController();