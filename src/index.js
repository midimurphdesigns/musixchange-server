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
const adRoutes = require('./modules/ad/routes');

const { localStrategy, jwtStrategy, jwtAuth } = require('./strategies');

mongoose.Promise = global.Promise;

const app = express();
const router = express.Router();

app.use(bodyParser.json());

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test',
  }),
);

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/auth', router);

const createAuthToken = function (user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    // expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', { session: false });
router.use(bodyParser.json());
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.toJSON());
  res.json({ authToken });
});

// const jwtAuth = passport.authenticate('jwt', { session: false });
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

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
