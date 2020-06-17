const mongoose = require('mongoose');
const Info = require('../models/Info');
const logs = require('./../helpers/logs');

const initialData = {
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

const InfoSeeder = (initialData) => {
    try {
        const data = new Info({ initialData });
        data.save(function(err) {
            if (err) throw err;
            console.log('data has ben seeded');
        });
        console.log(data);
        // Info.insertOne(initialData, (err, created) => {
        //     if (err) {
        //         logs(`Error on InfoSeeder:: Error: ..:: ${err.message} ::..`, 'error');
        //     } else {
        //         logs(`Success on InfoSeeder:: [${created._id}]`);
        //     }
        // })
    } catch (e) {
        logs(`Error on InfoSeeder:: Error: ..:: ${e.message} ::..`, 'error');
    }
};

InfoSeeder(initialData);