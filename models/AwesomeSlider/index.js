const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');
require('dotenv').config();
// New Schema
const AwesomeSliderSchema = new Schema({
    _id: {
        type: String,
        default: () => Guid.raw(),
    },
    en: [{
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }],
    arm: [{
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }],
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

AwesomeSliderSchema.pre('update', function (next) {
    const Model = this;
    this.updated_at = new Date().getTime();
    next();
});

// /**
//  * @return {string}
//  */
// AwesomeSliderSchema.statics.URLAttribute = function (image) {
//     return process.env.API_URL + '/' + image;
// };

module.exports = model('AwesomeSlider', AwesomeSliderSchema);