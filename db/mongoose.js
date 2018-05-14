const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Users');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are Connected!');
});



module.exports = {mongoose};