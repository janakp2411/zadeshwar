const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function fullUrl(req) {
  return req.protocol + '://' + req.get('host');
}

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
      role: config.userRole,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      resetPasswordToken: "false",
      resetPasswordExpires: "test",
      rawpassword: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, user) => {
    if(user){
      return res.json({ success: false, msg: 'This Email id is already used by some user' });
    }  else {
      User.addUser(newUser, (err, user) => {
        if (err) {
            return res.json({ success: false, msg: 'Failed to register user' });
        }
        var data = {
            user: user,
            subject: 'Register Confirmation !!!',
            content: 'Hello,\n\n' + 'Thank you for joining with us. This is a confirmation that you have created account with ' + user.email + ' successfully'
        }
        User.sendEmail(data, (err, response) => {
            if (err) {
                res.json({ success: true, msg: 'User successfully registered but failed to send email' });
            } else {
                res.json({ success: true, msg: 'you are successfully registered Please do a login.' });
            }
        });
    });
    }
  });

});

// Authenticate
router.post('/authenticate', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByUsername(email, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({success: false, msg: 'User not found'});
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//forgotpassword
router.post('/forgotPassword', (req, res, next) => {
  var email = req.body.email;
  var token;
  crypto.randomBytes(20, (err, buf) => {
      if (err) {
          return res.send({ success: false, msg: 'Something goes wrong' });
      } else {
          token = buf.toString('hex');
          User.findOne({ email: email }, (err, user) => {
            if (err) return res.redirect('forgotPassword');
            if (!user) {
                console.log('Sorry!!!  This email id is not registeded yet, Please do register first');
                return res.json({ success: false, msg: 'This email id is not registeded yet, Please do register first' });
            } else {
                user.resetPasswordToken = token;
                user.save(function(err, userData) {
                  console.log(userData, 'resetPasswordToken')
                    if (!err) {
                        var data = {
                            user: user,
                            subject: 'Reset your Password',
                            content: 'Hello,\n\n' + 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                fullUrl(req) + '/users/reset/' + token + '\n\n' +
                                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                        }
                        User.sendEmail(data, (err, response) => {
                            if (err) {
                                res.json({ success: true, msg: 'User successfully registered but failed to send email' });
                            } else {
                                res.json({ success: true, msg: 'you are successfully registered Please do a login.' });
                            }
                        });
                    } else return res.redirect('forgotPassword');
      
                });
            }
        });
      }
  });
});

// reset Password
router.get('/reset/:token', (req, res, next) => {
  var token = req.params.token;
  if (!token) {
      return res.redirect(fullUrl(req) + '/forgotPassword');
  }

  User.findOne({ resetPasswordToken: token }, (err, user) => {
      if (err) {
          return res.redirect(fullUrl(req) + '/forgotPassword');
      } else {

          if (!user) {
              return res.redirect(fullUrl(req) + '/forgotPassword');
          } else {
              res.cookie('token', token);
              res.setHeader('Content-Type', 'application/json')
              return res.redirect(fullUrl(req) + '/resetpassword');
          }
      }
  });
});

// reset Password
router.post('/resetpassword', (req, res, next) => {
  User.findOne({ resetPasswordToken: req.body.token }, (err, user) => {
      if (!user) {
          return res.redirect('forgotPassword');
      } else {
          User.changePassword(user, req.body.pass, (err, user) => {
            if(!user){
              console.log(user, err, 'newUser.passwordnewUser.passwordnewUser.password')
            }
            if (err) {
                res.json({ success: false, msg: 'Failed to register user' });
            } else {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                toeken = undefined;
                var data = {
                    user: user,
                    subject: 'Reset password Confirmation!!',
                    content: 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                }
                User.sendEmail(data, (err, response) => {
                    if (err) {
                        res.json({ success: true, msg: 'User successfully registered but failed to send email' });
                    } else {
                        res.json({ success: true, msg: 'you are successfully registered Please do a login.' });
                    }
                });
            }
          });
      }
  });

});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
  const id = req.user._id
  UserDetails.getUserById(id, (err, user) => {
    const userInfo = {
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      _id: req.user._id
    }
    res.json({user: userInfo, userDetails: user && user.userData});
  })
});

// Use Details
router.post('/addUserDetails', passport.authenticate('jwt', {session:false}), (req, res) => {
    const { userDetails } = req.body;
    const { id } = userDetails;
    const userDetailsData = userDetails.userDetails;
    UserDetails.findOne({ _id: id }, (err, user) => {
      if(user){
        console.log('user found')
        const data = new UserDetails({id: user._id, userData:userDetailsData});
        data.findOneAndUpdate({id:mongoose.Types.ObjectId(id)}, {userData:userDetailsData, id:mongoose.Types.ObjectId(id)}, (err, details) => {
          console.log(details, err)
          // console.log(err, 'Details savedDetails savedDetails saved')
          if(details){
            return res.json({success: true,msg: 'Details saved', userDetails: details})
          } else {
            return res.json({success: false,msg: 'Details not saved',userDetails: details})
          }
        })
      } else {
        console.log('user not found')
        const data = new UserDetails({id: mongoose.Types.ObjectId(id), userData:userDetailsData});
        data.save(function(err, details){
          if(details){
            return res.json({success: true,msg: 'Details saved', userDetails: details.userData})
          } else {
            return res.json({success: true,msg: 'Details not saved',userDetails: details})
          }
        })
      }
    })
  });

module.exports = router;
