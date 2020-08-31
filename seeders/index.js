const express = require('express');
const logs = require('../helpers/logs');
const app = express();
require('dotenv').config();
const PORT = 3500;
const connect = require('../db');
const DB = process.env.MONGO_URI;
const listen = () => {
  logs(`Database connected at ${DB}`);
  app.listen(PORT, () => {
    logs(`App listen on port ${PORT}`);
  });
};
connect().on('error', logs).on('disconnected', connect).once('open', listen);

const AdminSeeding = require('./admin-seeder');
const AwesomeSliderSeeding = require('./awesomeSlider-seeder');
const InfoSeeding = require('./info-seeder');
const OurHistorySeeding = require('./ourHistory-seeder');
const ServiceSeeding = require('./service-seeder');
const OurMenuSeeding = require('./ourMenu-seeder');


const Seeding = () => {
  // AdminSeeding();
  // AwesomeSliderSeeding();
  // InfoSeeding();
  // OurHistorySeeding();
  // ServiceSeeding();
  OurMenuSeeding();
};
Seeding();