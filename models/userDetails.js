const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = new Schema({
  address: {
    type: String,
    require:true
  },
  familyMember: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('userDetains', UserSchema);