const mongoose = require('mongoose');
require('../models');
const StaticCounter = mongoose.model('StaticCounter');
const logs = require('./../helpers/logs');


const data = {
  coffeeBranches: '111',
  awards: '222',
  customers: '333',
  staffs: '444',
};

const StaticCounterSeeding = () => {
  return new Promise((resolve, reject) => {
    StaticCounter.create(data, (error, success) => {
      logs(`[Seeding Error]: ${error}`);
      logs(`[Seeding Success]: ${success}`);
      if (success) {
        resolve(success);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = StaticCounterSeeding;