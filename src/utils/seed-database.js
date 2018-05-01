'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../configs/constants');
const User = require('../modules/user/model');
const Ad = require('../modules/ad/model');

const seedAds = require('../seed/ads');
const seedUsers = require('../seed/users');

mongoose
  .connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Ad.insertMany(seedAds),
      User.insertMany(seedUsers),
      User.createIndexes(),
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
