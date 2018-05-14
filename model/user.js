const mongoose = require('mongoose');


let User = mongoose.model('User',{
    email: String,
    password: String
  });

    

  module.exports = {User} //Model Created