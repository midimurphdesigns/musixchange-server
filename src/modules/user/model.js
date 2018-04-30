'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
    };
  },
  validatePassword(password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);
