const mongoose = require('mongoose');
const download = require('image-downloader');
const logs = require('../../helpers/logs');
const validator = require('../../helpers/validate');
const errorMessage = require('../../helpers/errorMessage');

class InfoController {
    async uploadIcon(req, res) {
        try {
            const validationRule = {
                "item.download_url": "required|string",
                "item.format": "required|string",
                "item.preview_url": "required|string",
                "size": "required|numeric",
            };
            const data = req.body;
            validator(data, validationRule, {}, (err, status) => {
                if (!status) {
                    return errorMessage(res, null, err);
                }
            });
            const DIR = './public/uploads/icons/';
            const options = {
                url: data.item.preview_url,
                dest: DIR
            };
            const response = await download.image(options)
                .then((filename) => {
                    logs('Download Filename: ' + JSON.stringify(filename));
                    return filename;
                })
                .catch((err) => {
                    logs('Download Error: ' + JSON.stringify(err));
                    return err;
                });
            res.send({ message: response });
        } catch (e) {
            logs(`Error on InfoController uploadIcon function: [${e.message}]`);
            return errorMessage(res, null, e.message);
        }
    }

}

module.exports = new InfoController();