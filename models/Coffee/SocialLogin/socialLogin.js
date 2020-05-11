const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Guid = require('guid');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const SocialLoginSchema = new Schema({
    _id: {
        type: String,
        default: () => Guid.raw()
    },
    _provider: {
        type: String,
        required: true
    },
    _profile: [{
        id: String,
        name: String,
        firstName: String,
        lastName: String,
        email: {
            type : String,
            unique   : true,
            uniqueCaseInsensitive: true,
            validate : {
                validator: (value) => validator.isEmail(value),
                message: '{VALUE} is not a valid email'
            }
        },
        profilePicURL: String
    }],
    _token: [{
        accessToken: String,
        expiresAt: Number
    }],
    updated_at: {
        type: Date,
        default: new Date().getTime()
    },
    created_at: {
        type: Date,
        default: new Date().getTime()
    }
});

SocialLoginSchema.plugin(uniqueValidator);
module.exports = model('SocialLogin', SocialLoginSchema);