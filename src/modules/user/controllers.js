const Joi = require('joi');

const User = require('./model');

const registerField = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.register = (req, res) => {
  try {
    Joi.validate(req.body, registerField);
  } catch (error) {
    return res.status(400).json({ error: JSON.stringify(error) });
  }

  User.create(req.body)
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(error => {
      return res.status(400).json({ error });
    });
};

exports.me = (req, res) => {
  console.log('! ------')
  User.findById(req.user.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({ error: JSON.stringify(err) }));
};
