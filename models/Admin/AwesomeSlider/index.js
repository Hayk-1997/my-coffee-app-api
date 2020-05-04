const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

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

AwesomeSliderSchema.statics.first = function () {
    const Model = this;
    return new Promise( (resolve, reject) => {
        try {
           Model.findOne((error, success) => {
                if (error) {
                    return reject(error);
                }
                return resolve(success);
            });
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * @return {string}
 */
AwesomeSliderSchema.statics.URLAttribute = function () {
    return process.env.API_URL + '/' + 'uploads/';
};

module.exports = model('AwesomeSlider', AwesomeSliderSchema);