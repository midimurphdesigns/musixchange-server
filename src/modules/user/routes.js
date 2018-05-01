const { Router } = require('express')

const { register } = require('./controllers');

const routes = Router();

routes.post('/', register)

module.exports = routes