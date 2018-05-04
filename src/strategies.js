'use strict';

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const passport = require('passport');
const User = require('./modules/user/model');
const { JWT_SECRET } = require('./configs/constants');

const localOpts = {
  usernameField: 'username',
};

const localStrategy = new LocalStrategy(
  localOpts,
  (username, password, callback) => {
    let user;
    User.findOne({ username })
      .then(_user => {
        console.log('user ---->', _user);
        user = _user;
        if (!user) {
          return callback(null, false);
        }
        return user.validatePassword(password);
      })
      .then(isValid => {
        if (!isValid) {
          return callback(null, false);
        }
        return callback(null, user);
      })
      .catch(err => {
        if (err.reason === 'LoginError') {
          return callback(null, false, err);
        }
        return callback(err, false);
      });
  },
);

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256'],
  },
  (payload, done) => {
    console.log('payload', payload);
    done(null, payload.user);
  },
);

const jwtAuth = passport.authenticate('jwt', { session: false });

const localAuth = passport.authenticate('local', { session: false });

module.exports = { localStrategy, jwtStrategy, jwtAuth, localAuth };
