const httpStatus = require('./httpStatus');

const errorMessage = (res, status = null, message = null) => {
  return res.status(status || httpStatus.BAD_REQUEST).json({
    status: status || httpStatus.BAD_REQUEST,
    message: message || 'Something went wrong!',
  });
};

module.exports = errorMessage;