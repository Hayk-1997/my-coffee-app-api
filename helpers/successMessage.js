const httpStatus = require('./httpStatus');

const successMessage = (res, status = null, message = null, data = {}) => {
    return res.status(status || httpStatus.OK).json({
        status: status || httpStatus.OK,
        message: message || 'Data updated successfully',
        data: data,
    });
};

module.exports = successMessage;