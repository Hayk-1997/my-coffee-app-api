const { model } = require('mongoose');
const Cart = model('Cart');
const Log = require('../../helpers/winston-logger');

class CartController {

  /**
   *
   * @param req
   * @returns {Promise<QueryString.ParsedQs|void|*>}
   */
  async store(req) {
    try {
      Log.info('----Start CartController store----');
      const findCart = await Cart.findOne({ product: req.product, user: req.user });
      if (findCart) {
        return Cart.findOneAndUpdate(
          { product: req.product, user: req.user },
          { quantity: req.quantity + Number(findCart.quantity) });
      } else {
        return Cart.create({ ...req });
      }
    } catch (e) {
      Log.info(`----[CartController store: Error]----: ${JSON.stringify(e.message)}`);
      throw new Error(e);
    }
  }
}

module.exports = new CartController();