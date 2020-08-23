const mongoose = require('mongoose');
require('dotenv').config();
// Connect to database
const connect = () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.set('useCreateIndex', true);
  mongoose.connect(process.env.MONGO_URI, options);
  return mongoose.connection;
};
module.exports = connect;
