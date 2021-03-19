const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const { successMessage } = require('../../helpers/handleMessage');
const { errorMessage } = require('../../helpers/handleMessage');
const Log = require('../../helpers/winston-logger');
const { setImagePath } = require('../../helpers/motations');
const fs = require('fs');

class ProductController {
  async get (req, res) {
    try {
      Log.info('----Start ProductController get----');
      const response = await Product.find().sort({ 'updatedAt': -1 }).populate('categories');
      return successMessage(res, null, 'success', response);
    } catch (e) {
      Log.info(`----[ProductController get: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
  async create (req, res) {
    try {
      Log.info('----Start ProductController create----');
      const jsonParser = JSON.parse(req.body.form);

      const data = {
        en: jsonParser.en,
        am: jsonParser.am,
        price: jsonParser.price,
        rate: jsonParser.rate,
        discount: jsonParser.discount,
        categories: jsonParser.categories.map(category => category._id),
        thumbnail: req.files.map((file) => setImagePath(file.destination, file.filename)),
        slug: jsonParser.slug,
      };
      await Product.create(data, (error) => {
        if (error) {
          return errorMessage(res, null, error.message);
        }
        return successMessage(res, null, 'Product successfully created');
      });
    } catch (e) {
      Log.info(`----[ProductController create: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
  async destroy(req, res) {
    try {
      Log.info('----Start ProductController destroy----');
      const product = await Product.findById(req.params.id);
      const thumbnails = product.thumbnail;
      thumbnails.length && thumbnails.map(thumbnail => fs.unlinkSync(thumbnail));
      await Product.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
          return errorMessage(res, null, error.message);
        }
        return successMessage(res, null, 'Product successfully deleted');
      });
    } catch (e) {
      Log.info(`----[ProductController destroy: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
  async update (req, res) {
    try {
      Log.info('----Start ProductController update----');
      const jsonParser = JSON.parse(req.body.form);
      const id = req.params.id;
      const thumbnails = req.files.map((file) => setImagePath(file.destination, file.filename));
      const data = {
        en: jsonParser.en,
        am: jsonParser.am,
        price: jsonParser.price,
        rate: jsonParser.rate,
        discount: jsonParser.discount,
        categories: jsonParser.categories.map(category => category._id),
        thumbnail: req.body.previousThumbnail ? thumbnails.concat(req.body.previousThumbnail) : thumbnails,
      };

      const removedThumbnails = req.body.removedThumbnails;
      removedThumbnails && removedThumbnails.length && removedThumbnails.map(thumbnail => fs.unlinkSync(thumbnail));
      await Product.update({ _id: id }, { '$set': data }, (error) => {
        if (error) {
          return errorMessage(res, null, error.message);
        }
        return successMessage(res, null, 'Product successfully updated');
      });
    } catch (e) {
      Log.info(`----[ProductController update: Error]----: ${JSON.stringify(e.message)}`);
      return errorMessage(res, null, e.message);
    }
  }
}

module.exports = new ProductController();