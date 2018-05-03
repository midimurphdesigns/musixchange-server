const { Router } = require('express');

const { getAll, create, getById, getFromUser, remove } = require('./controllers');
const { jwtAuth } = require('../../strategies');

const routes = Router();

routes.get('/me', jwtAuth, getFromUser);
routes.get('/', getAll);
routes.get('/:id', getById);
routes.post('/', jwtAuth, create);
// routes.put('/', updated);
routes.delete('/:id', jwtAuth, remove);

module.exports = routes;
