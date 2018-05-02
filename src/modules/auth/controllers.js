const jwt = require('jsonwebtoken');

const config = require('../../configs/constants');

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    // expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256',
  });
};

exports.login = (req, res) => {
  console.log('====================================');
  console.log('req', req.body);
  console.log('====================================');
  const authToken = createAuthToken(req.user.toJSON());
  res.json({ authToken });
};
