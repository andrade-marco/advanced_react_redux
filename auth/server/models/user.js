const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

//On save hook, encrypt password
//Before saving a document, run this function
userSchema.pre('save', function(next) {
  //Get access to the user instance
  const user = this;

  //Generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    //Hash (encrypt) password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      //Overwrite text password with hashed password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(enteredPassword, callback) {
  bcrypt.compare(enteredPassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
}

//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;
