const Joi = require('joi');

const User = require('./model');
const { createAuthToken } = require('../auth/controllers');

const registerField = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.register = (req, res) => {
  console.log(req.body);
  try {
    Joi.validate(req.body, registerField);
  } catch (error) {
    return res.status(400).json({ error: JSON.stringify(error) });
  }

  User.create(req.body)
    .then(user => {
      const authToken = createAuthToken(user.toJSON());
      return res.status(200).json({ authToken });
    })
    .catch(error => {
      return res.status(400).json({ error });
    });
};

exports.me = (req, res) => {
  User.findById(req.user.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({ error: JSON.stringify(err) }));
};
