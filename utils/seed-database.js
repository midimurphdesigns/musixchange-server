'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const User = require('../schemas/user');
const Ad = require('../schemas/ad');

const seedAds = require('../seed/ads');
const seedUsers = require('../seed/users');

mongoose.connect(DATABASE_URL)
    .then(() => mongoose.connection.db.dropDatabase())
    .then(() => {
        return Promise.all([
            Ad.insertMany(seedAds),
            User.insertMany(seedUsers),
            User.createIndexes()
        ]);
    })
    .then(() => mongoose.disconnect())
    .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
    });