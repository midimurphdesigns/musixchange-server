'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./configs/constants');
const { dbConnect } = require('./configs/db');
const config = require('./configs/constants');
const userRoutes = require('./modules/user/routes');
const postRoutes = require('./modules/post/routes');
const authRoutes = require('./modules/auth/routes');
const middlewaresConfig = require('./configs/middlewares');

const { jwtAuth } = require('./strategies');

mongoose.Promise = global.Promise;

const app = express();
const router = express.Router();

middlewaresConfig(app);

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// // const jwtAuth = passport.authenticate('jwt', { session: false });
// router.post('/refresh', jwtAuth, (req, res) => {
//   const authToken = createAuthToken(req.user);
//   res.json({ authToken });
// });

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
  // dbConnect();
  // runServer();
}

module.exports = { app, runServer, closeServer, router };
