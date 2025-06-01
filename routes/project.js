const routes = require('express').Router();
const temples = require('../controllers/project.js');

routes.get('/', projects.findAll);
routes.get('/:project_id', projects.findOne);

routes.post('/', projects.create);

module.exports = routes;