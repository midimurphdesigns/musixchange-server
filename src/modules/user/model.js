'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }

  return next();
});

userSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      username: this.username,
      email: this.email,
    };
  },
  validatePassword(password) {
    return bcrypt.compare(password, this.password);
  },
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },
};

module.exports = mongoose.model('User', userSchema);
