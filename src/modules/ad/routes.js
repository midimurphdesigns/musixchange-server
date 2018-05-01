const { Router } = require('express');

const { getAll, create, getById } = require('./controllers');

const routes = Router();

routes.get('/', getAll);
routes.get('/:id', getById);
routes.post('/', create);
// routes.put('/', updated);
// routes.delete('/:id', remove);

module.exports = routes;
