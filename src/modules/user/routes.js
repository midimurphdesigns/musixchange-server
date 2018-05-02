const { Router } = require('express');

const { register, me } = require('./controllers');
const { jwtAuth } = require('../../strategies');

const routes = Router();

routes.post('/', register);
routes.get('/me', jwtAuth, me);
// routes.post('/api/auth/login', login)

module.exports = routes;
