const mongoose = require('mongoose');
require('../models');
const AdminModel = mongoose.model('Admin');
const logs = require('../helpers/logs');

const data = {
  email: 'admin3@gmail.com',
  password: '123123'
};
const AdminSeeding = () => AdminModel.create(data, (error, success) => {
    logs(`[Seeding Error]: ${error}`);
    logs(`[Seeding Success]: ${success}`);
});
module.exports = AdminSeeding;
