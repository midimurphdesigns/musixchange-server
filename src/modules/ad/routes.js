const { Router } = require('express');

const { getAll, create, getById, getFromUser } = require('./controllers');
const { jwtAuth } = require('../../strategies')

const routes = Router();

routes.get('/', getAll);
routes.get('/me', jwtAuth, getFromUser);
routes.get('/:id', getById);
routes.post('/', jwtAuth, create);
// routes.put('/', updated);
// routes.delete('/:id', remove);

module.exports = routes;
