import AppointmentController from '../app/controllers/AppointmentController';

module.exports = (server, routes, prefix = '/appointments') => {
  routes.get('/', AppointmentController.index);
  routes.post('/', AppointmentController.store);

  server.use(prefix, routes);
}