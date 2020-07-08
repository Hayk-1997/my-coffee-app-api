const mongoose = require('mongoose');
require('../models');
const AwesomeSliderModel = mongoose.model('AwesomeSlider');
const logs = require('../helpers/logs');

const data = {
    en: [{
        title: 'English Title',
        description: 'English Description',
    }],
    arm: [{
        title: 'Armenian Title',
        description: 'Armenian Description',
    }],
    image: 'https://images.unsplash.com/photo-1593346134815-68592a081b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',

};
const AwesomeSliderSeeding = () => {
    return new Promise((resolve, reject) => {
        AwesomeSliderModel.create(data, (error, success) => {
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
module.exports = AwesomeSliderSeeding;