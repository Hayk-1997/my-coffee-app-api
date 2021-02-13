const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Log = require('../../helpers/winston-logger');

class ProductController {
  async getTopProducts () {
    try {
      Log.info('----Start ProductController get----');
      const response = await Product.find({});
      if (response) {
        Log.info(`----[ProductController get Success]---- ${JSON.stringify(response)}`);
        return { ...response };
      } else {
        Log.info('----[ProductController get Error]----');
      }
    } catch (e) {
      Log.info(`----[ProductController get:Error]----: ${JSON.stringify(e.message)}`);
      return { ...e.message };
    }
  }
}

module.exports = new ProductController();