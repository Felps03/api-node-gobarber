import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';

module.exports = (server, routes, prefix = '/auth') => {
  routes.post('/login', SessionController.store);
  routes.post('/register', UserController.store);

  server.use(prefix, routes);
}