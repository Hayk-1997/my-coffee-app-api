/**
 * @return {string}
 * @param destination
 * @param filename
 */
const setImagePath = (destination, filename) => destination.slice(2) + '/' + filename;

/**
 * @return {string}
 * @param image
 */
const getImageFullPath = (image) => process.env.API_URL + '/' + image;

module.exports = {
  getImageFullPath,
  setImagePath
};