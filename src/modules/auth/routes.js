const { Router } = require('express');

const { login } = require('./controllers');
const { localAuth } = require('../../strategies');

const routes = Router();

routes.post('/login', localAuth, login);

module.exports = routes;
