const { Router } = require('express')

const { register } = require('./controllers');

const routes = Router();

routes.post('/', register)
// routes.post('/api/auth/login', login)

module.exports = routes