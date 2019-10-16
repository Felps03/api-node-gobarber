import UserController from '../app/controllers/UserController';

module.exports = (server, routes, prefix = '/users') => {
  routes.put('/', UserController.update);

  server.use(prefix, routes);
}