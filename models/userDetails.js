const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = new Schema({id: '', userData:  [{}]});

const UserDetails = module.exports = mongoose.model('userDetails', UserSchema);

module.exports.getUserById = function(id, callback) {
  UserDetails.findOne({id}, callback);
}

module.exports.replaceOneById = function(id, data, callback) {
  UserDetails.update({id},  {$set:data}, callback);
}

