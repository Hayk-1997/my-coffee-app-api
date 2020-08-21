const download = require('image-downloader');
const logs = require('./logs');

const downloader = download.image(options = [])
  .then((filename) => {
    logs('Download Filename: ' + JSON.stringify(filename));
    return filename;
  })
  .catch((err) => {
    logs('Download Error: ' + JSON.stringify(err));
    return err;
  });
module.exports = downloader;