const { Router } = require('express');
const routes = new Router();
const UserController = require('./controller/UserController')

routes.post('/signin', UserController.signin)
routes.post('/signup', UserController.signup)
routes.post('/addPokemon', UserController.addPokemon)
routes.put('/updatePokemon', UserController.updatePokemon)
routes.delete('/deletePokemon/:index', UserController.deletePokemon)

module.exports = routes;