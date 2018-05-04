'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../configs/constants');
const User = require('../modules/user/model');
const Post = require('../modules/post/model');

const seedPosts = require('../seed/posts');
const seedUsers = require('../seed/users');

mongoose
  .connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Post.insertMany(seedPosts),
      User.insertMany(seedUsers),
      User.createIndexes(),
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
