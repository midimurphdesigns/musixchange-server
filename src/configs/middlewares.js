'use strict';

const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

const { jwtStrategy, localStrategy } = require('../strategies');
const { CLIENT_ORIGIN } = require('./constants');

module.exports = app => {
  app.use(bodyParser.json());
  passport.use(localStrategy);
  passport.use(jwtStrategy);

  app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
      skip: (req, res) => process.env.NODE_ENV === 'test',
    }),
  );

  // app.use((req, res, next) => {
  //   // console.log('user', req.user);
  //   // console.log('headers', req.headers);
  //   next();
  // });

  // app.use(
  //   // cors({
  //   //   origin: CLIENT_ORIGIN,
  //   // }),
  // );
  // app.use(cors({
  //   credentials: true,
  //   origin: CLIENT_ORIGIN,
  // }))

  app.use(cors());

  // app.use(cors({
  //   'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
  //   // 'exposedHeaders': ['sessionId'],
  //   credentials: true,
  //   'origin': '*',
  //   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   'preflightContinue': false,
  // }));

  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept',
  //   );
  //   next();
  // });
};
