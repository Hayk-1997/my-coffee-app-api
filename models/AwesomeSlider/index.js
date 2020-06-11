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
    Model.updated_at = new Date().getTime();
    next();
});

module.exports = model('AwesomeSlider', AwesomeSliderSchema);