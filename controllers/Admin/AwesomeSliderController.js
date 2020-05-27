const mongoose = require('mongoose');
const AwesomeSliderModel = mongoose.model('AwesomeSlider');
const { setImagePath, getImageFullPath } = require('../../helpers/motations');
const logs = require('../../helpers/logs');
const errorMessage = require('../../helpers/errorMessage');
const successMessage = require('../../helpers/successMessage');
const validator = require('../../helpers/validate');
const fs = require('fs-extra');

class AwesomeSliderController {
    // Get AwesomeSlider Data
    async get (req, res) {
        try {
            const response = await AwesomeSliderModel.findOne();
            if (response._id) {
                response.image = getImageFullPath(response.image);
                return successMessage(res, null, 'success', response);
            } else {
                return errorMessage(res);
            }
        } catch (e) {
            logs(`Error on AwesomeSliderController get function: [${e.message}]`);
            return errorMessage(res, null, e.message);
        }
    }
    // Update Data
    async update (req, res) {
        try {
            const validationRule = {
                "en.title": "string",
                "en.description": "string",
                "arm.title": "string",
                "arm.description": "string",
            };
            const data = JSON.parse(req.body.form);
            validator(data, validationRule, {}, (err, status) => {
                if (!status) {
                    return errorMessage(res, null, err);
                }
            });
            if (req.file) {
                data.image = setImagePath(req.file.destination, req.file.filename);
            }
            const response = await AwesomeSliderModel.findOne();
            // Update Getting data
            if (response.id) {
                await AwesomeSliderModel.updateOne(data, (error, success) => {
                    if (error) {
                        return errorMessage(res);
                    }
                    if (fs.existsSync(response.image) && response.id && req.file) {
                        fs.unlinkSync(response.image);
                    }
                    return successMessage(res, null, 'Data updated successfully');
                });
            } else {
                return errorMessage(res);
            }
        } catch (e) {
            logs(`Error on AwesomeSliderController update function: [${e.message}]`);
            return errorMessage(res, null, e.message);
        }
    }
}

module.exports = new AwesomeSliderController();