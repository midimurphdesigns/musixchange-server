'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./configs/constants');
const { dbConnect } = require('./configs/db');
const userRoutes = require('./modules/user/routes');
const adRoutes = require('./modules/ad/routes');

// const Ad = require('./schemas/ad');
// const User = require('./schemas/user');
const { localStrategy, jwtStrategy, jwtAuth } = require('./strategies');

mongoose.Promise = global.Promise;

const app = express();

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

// app.use('/api/users/', usersRouter);
// app.use('/api/auth/', authRouter);

// A protected endpoint which needs a valid JWT to access it
// app.get('/api/protected', jwtAuth, (req, res) => {
//   return res.json({
//     data: 'rosebud',
//   });
// });

// app.get('/api/ads', (req, res) => {
//   Ad.find().then(data => {
//     console.log(data);
//     return res.json(data);
//   });
// });

// app.post('/api/ads', (req, res) => {
//   Ad.create(req.body).then(data => {
//     return res.json(data);
//   });
// });

// app.post('/api/users', (req, res) => {
//   User.create(req.body).then(data => {
//     return res.json(data);
//   });
// });

// app.post('/api/auth/login', (req, res) => {
//   User.create(req.body).then(data => {
//     return res.json(data);
//   });
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

module.exports = { app, runServer, closeServer };
