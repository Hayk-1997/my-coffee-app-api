const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logs = require('./helpers/logs');
const path = require('path');
const app = express();
// Models
require('./models');
// Coffee Models
require('./models/Coffee/SocialLogin/socialLogin');
//
app.use(cors());
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Handle Routes
const routes = require('./routes');
app.use(routes);
//
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

connect().on('error', logs).on('disconnected', connect).once('open', listen);