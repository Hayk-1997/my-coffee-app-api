const mongoose = require('mongoose');
require('../models');
const OurHistoryModel = mongoose.model('OurHistory');
const logs = require('./../helpers/logs');

const data = {
  en: {
    title: 'English Title',
    subTitle: 'English SubTitle',
    description: 'English Description',
  },
  am: {
    title: 'Armenian Title',
    subTitle: 'Armenian SubTitle',
    description: 'Armenian Description',
  },
  image: 'https://images.unsplash.com/photo-1593346134815-68592a081b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
};

const OurHistorySeeding = () => {
  return new Promise((resolve, reject) => {
    OurHistoryModel.create(data, (error, success) => {
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

module.exports = OurHistorySeeding;