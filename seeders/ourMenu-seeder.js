const mongoose = require('mongoose');
require('../models');
const OurMenu = mongoose.model('OurMenu');
const logs = require('./../helpers/logs');


const fields = {
  card1: {
    description: 'Description',
    image: 'image_url',
  },
  card2: {
    description: 'Description',
    image: 'image_url',
  },
  card3: {
    description: 'Description',
    image: 'image_url',
  },
  card4: {
    description: 'Description',
    image: 'image_url',
  }
};

const data = {
  en : {
    description: 'Description',
    ...fields,
  },
  am : {
    description: 'Description',
    ...fields,
  },
};

const OurMenuSeeding = () => {
  return new Promise((resolve, reject) => {
    OurMenu.create(data, (error, success) => {
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

module.exports = OurMenuSeeding;