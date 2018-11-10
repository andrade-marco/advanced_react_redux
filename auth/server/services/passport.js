//Passport configuration
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');

//Create local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //Verify this email and password, call done with the username
  //if it is the correct email and password
  //Otherwise call done with false
  User.findOne({email}, function(err, foundUser) {
    if (err) return done(err, false);
    if (!foundUser) done(null, false);

    //Comparing password for user - password equal to user.password
    foundUser.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (!isMatch) return done(null, false);

      return done(null, foundUser);
    });
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in the DB
  //If it does, call 'done' with that ID
  //Otherwise, call done withou a user object
  User.findById(payload.sub, function(err, foundUser) {
    if (err) return done(err, false);

    if (foundUser) {
      done(null, foundUser);
    } else {
      done(null, false);
    }
  });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
