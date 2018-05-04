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

  app.use(cors());
};
