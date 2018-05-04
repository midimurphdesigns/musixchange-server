'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./src/configs/constants');
const { dbConnect } = require('./src/configs/db');
const config = require('./src/configs/constants');
const userRoutes = require('./src/modules/user/routes');
const postRoutes = require('./src/modules/post/routes');
const authRoutes = require('./src/modules/auth/routes');
const middlewaresConfig = require('./src/configs/middlewares');

const { jwtAuth } = require('./src/strategies');

mongoose.Promise = global.Promise;

const app = express();
const router = express.Router();

middlewaresConfig(app);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// app.use(passport.authenticate('jwt', { session: false, failWithError: true }))
app.use('/api/posts', postRoutes);

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer, router };
