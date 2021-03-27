const mongoose = require('mongoose');
require('../models');
const Cart = mongoose.model('Cart');
const logs = require('../helpers/logs');

const data = {
  product: '604d0800f10ad2209c61983f',
  user: '60551fc731e56c1040e3ae48',
  quantity: '2',
  type: 'small'
};

const CartSeeding = () => Cart.create(data, (error, success) => {
  logs(`[Seeding Error]: ${error}`);
  logs(`[Seeding Success]: ${success}`);
});

module.exports = CartSeeding;