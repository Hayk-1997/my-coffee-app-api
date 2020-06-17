const {
    createLogger,
    transports,
    format
} = require('winston');

require('winston-mongodb');
const __DIR__ = './storage/';
const logger = createLogger({
    transports: [
        new transports.File({
            filename: __DIR__  + 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json()),
        }),
        // new transports.MongoDB({
        //     level: 'error',
        //     db: process.env.MONGO_URI,
        //     options: {
        //         useUnifiedTopology: true
        //     },
        //     collection: 'babaji',
        //     format: format.combine(format.timestamp(), format.json())
        // })
    ]
});

module.exports = logger;