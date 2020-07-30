const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');

const fields = {
    phone: {
        number: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
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
        },
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
        icon: {
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
        },
    },
    workingHours: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
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
        },
    },
};

const InfoSchema = new Schema ({
    _id: {
        type: String,
        default: () => Guid.raw(),
    },
    en: {
      ...fields,
    },
    am: {
       ...fields,
    }
}, {
    timestamp: true,
});

InfoSchema.pre('update', function (next) {
    this.updated_at = new Date().getTime();
    next();
});

InfoSchema.pre('save', function (next) {
    const Model = this;
    Model.updated_at = new Date().getTime();
    next()
});

module.exports = model('Info', InfoSchema);