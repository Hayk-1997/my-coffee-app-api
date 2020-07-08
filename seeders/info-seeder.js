const mongoose = require('mongoose');
require('../models');
const InfoModel = mongoose.model('Info');
const logs = require('./../helpers/logs');

const fields = {
    phone: {
        number: '094066112',
        description: 'Phone Description',
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
    address: {
        title: 'Yerevan Avan Duryan',
        description: 'Address Description',
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
    workingHours: {
        title: 'Yerevan Avan Duryan',
        description: 'Address Description',
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
    en: {
        ...fields,
    },
    arm: {
        ...fields,
    }
};

const InfoSeeding = () => {
    return new Promise((resolve, reject) => {
        InfoModel.create(data, (error, success) => {
            logs(`[Seeding Error]: ${error}`);
            logs(`[Seeding Success]: ${success}`);
            if (success) {
                resolve(success);
            } else {
                reject(error);
            }
        })
    })
};
module.exports = InfoSeeding;