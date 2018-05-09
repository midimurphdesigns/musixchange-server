const jwt = require('jsonwebtoken');

const config = require('../../configs/constants');

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    algorithm: 'HS256',
  });
};

exports.login = (req, res) => {
  const authToken = createAuthToken(req.user.toJSON());
  res.json({ authToken });
};

exports.createAuthToken = createAuthToken;
