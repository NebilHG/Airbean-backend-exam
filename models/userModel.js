const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username.'],
    unique: [true, 'This username is already in use.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same.',
    },
  },
});

// Middleware
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (enteredPassword, userPassWord) {
  return await bcrypt.compare(enteredPassword, userPassWord);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
