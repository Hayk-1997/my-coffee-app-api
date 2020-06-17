const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

const iconField = {
    item: {
        download_url: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            required: true,
        },
        preview_url: {
            type: String,
            required: true,
        }
    },
    size: {
        type: Number,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    }
};

const schemaFields = {
    phone: {
        number: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        iconField,
    },
    address: {
       title: {
           type: String,
           required: true,
       },
        description: {
            type: String,
            required: true,
        },
        iconField,
    },
    workingHours: {
      title: {
          type: String,
          required: true,
      },
       description: {
           type: String,
           required: true,
       }
    },
    iconField,
};

const InfoSchema = new Schema ({
    _id: {
        type: String,
        default: () => Guid.raw(),
    },
    en: [ schemaFields ],
    arm: [ schemaFields ]
}, {
    timestamp: true,
});

InfoSchema.pre('update', function (next) {
    const Model = this;
    Model.updated_at = new Date().getTime();
    next();
});

InfoSchema.pre('save', function (next) {
    const Model = this;
    Model.updated_at = new Date().getTime();
    next()
});

module.exports = model('Info', InfoSchema);