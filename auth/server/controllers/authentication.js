// Authentication handlers
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }

  //See if user with the given email exists
  User.findOne({email: email}, function(err, existingUser) {
    if (err) return err;

    //If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }

    //If a user with email does not exist, create and save user record
    const user = new User({email, password});
    user.save(function(err) {
      if (err) return next(err);
      //Respond to request indicating the user was created
      res.json({token: tokenForUser(user)});
    });
  });
}

exports.signin = function(req, res, next) {
  //User has already had their email and password auth'd
  //Just need to give user a token
  res.json({token: tokenForUser(req.user)});
}
