const {
  createLogger,
  transports,
  format
} = require('winston');
require('dotenv').config();

require('winston-mongodb');
const __DIR__ = './storage/';
const date = new Date();
const logger = createLogger({
  transports: [
    new transports.File({
      filename: __DIR__ + date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() +'-info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    // new transports.MongoDB({
    //   filename: __DIR__ + 'Error' + date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() +'-info.log',
    //   level: 'error',
    //   db: process.env.MONGO_URI,
    //   options: {
    //     useUnifiedTopology: true
    //   },
    //   collection: 'test',
    //   format: format.combine(format.timestamp(), format.json())
    // })
  ]
});

module.exports = logger;