const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const cors = require('cors');
const helmet = require('helmet');
const logs = require('./helpers/logs');
// Admin Models
require('./models/Admin/Auth');
require('./models/AwesomeSlider');
// Coffee Models
require('./models/Coffee/SocialLogin/socialLogin');
//
const app = express();
app.use(cors());
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Handle Routes
const Routes = require('./routes');
app.use(Routes);

app.use(function (req, res) {
    const reqpath = req.url.toString().split('?')[0];
    if (fs.existsSync(__dirname + reqpath)) {
        res.sendFile(__dirname + reqpath);
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    }
});

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found', status: 404 })
});
// Start run environment
const PORT = process.env.PORT || 3100;
const connect = require('./db');
require('dotenv').config();
const DB = process.env.MONGO_URI;
const listen = () => {
    logs(`Database connected at ${DB}`);
    app.listen(PORT, () => {
        logs(`App listen on port ${PORT}`);
    })
};
// listen();
connect().on('error', logs).on('disconnected', connect).once('open', listen);