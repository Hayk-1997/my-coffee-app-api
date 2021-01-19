const httpStatus = require('./httpStatus');

const errorMessage = (res, status = null, message = null) => {
  return res.status(status || httpStatus.BAD_REQUEST).json({
    status: status || httpStatus.BAD_REQUEST,
    message: message || 'Something went wrong!',
  });
};

const successMessage = (res, status = null, message = null, data = {}) => {
  return res.status(status || httpStatus.OK).json({
    status: status || httpStatus.OK,
    message: message,
    data: data,
  });
};

module.exports = {
  errorMessage,
  successMessage
};