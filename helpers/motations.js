/**
 * @return {string}
 * @param destination
 * @param filename
 */
setImagePath = (destination, filename) => {
    return destination.slice(2) + '/' + filename;
};


/**
 * @return {string}
 * @param image
 */
getImageFullPath = (image) => {
    return process.env.API_URL + '/' + image;
};

module.exports = {
    getImageFullPath,
    setImagePath
};