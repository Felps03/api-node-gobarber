import NotificationController from '../app/controllers/NotificationController';

module.exports = (server, routes, prefix = '/notifications') => {
  routes.get('/', NotificationController.index);

  server.use(prefix, routes);
}