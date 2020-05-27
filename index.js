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
//
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found', status: 404 })
});
// Start run environment
require('dotenv').config();
const PORT = process.env.PORT || 3100;
const connect = require('./db');
const DB = process.env.MONGO_URI;
const listen = () => {
    logs(`Database connected at ${DB}`);
    app.listen(PORT, () => {
        logs(`App listen on port ${PORT}`);
    })
};
// listen();
connect().on('error', logs).on('disconnected', connect).once('open', listen);