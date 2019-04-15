const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = new Schema({
  role: {
    type: String,
    require:true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken:{
    type : String,
    required: false
  },
  resetPasswordExpires: {
    type : String,
    required: false
  },
  rawpassword: {
    type: String,
    require : false
  }
});

const User = module.exports = mongoose.model('ZadeshwarUsers', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(email, callback) {
  const query = {email: email}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.rawpassword = newUser.password
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.changePassword = (user, newPassword, callback) => {
  console.log(user, newPassword)

  bcrypt.genSalt(10, (err, salt) => {
    if(err){
      callback(true, false);
    }
    bcrypt.hash(newPassword, salt, (err, hash) => {
      if(err) {
        console.log(err);
        callback(true, false);
      } else{
        user.password = hash;
        user.rawpassword = newPassword;
        user.save(callback);
      }
    });
  });
};

module.exports.sendEmail = function(data, callback){

  var helper = require('sendgrid').mail,
      fromEmail = new helper.Email('janakp2411@gmail.com'),
      toEmail = new helper.Email(data.user.email),
      subject = data.subject,
      content = new helper.Content('text/plain', data.content),
      mail = new helper.Mail(fromEmail, subject, toEmail, content),
      sg = require('sendgrid')(config.emailAPIkey),
      request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });
      
  sg.API(request, (err, response) => {
    callback(err, response);
  });

}
