const mongoose = require('mongoose');
require('../models');
const ServiceModel = mongoose.model('Service');
const logs = require('./../helpers/logs');

const fields = {
  box1: {
    title: 'Box1 Title',
    description: 'Box1 Description',
    icon: {
      item: {
        download_url: 'Download url',
        format: 'Icon Format',
        preview_url: 'Preview url',
      },
      size: 64,
      tags: ['Phone']
    }
  },
  box2: {
    title: 'Box2 Title',
    description: 'Box2 Description',
    icon: {
      item: {
        download_url: 'Download url',
        format: 'Icon Format',
        preview_url: 'Preview url',
      },
      size: 64,
      tags: ['Phone']
    }
  },
  box3: {
    title: 'Box3 Title',
    description: 'Box3 Description',
    icon: {
      item: {
        download_url: 'Download url',
        format: 'Icon Format',
        preview_url: 'Preview url',
      },
      size: 64,
      tags: ['Phone']
    }
  },
};


const data = {
  en: { ...fields },
  am: { ...fields },
};

const Seeding = () => {
  return new Promise((resolve, reject) => {
    ServiceModel.create(data, (error, success) => {
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

module.exports = Seeding;