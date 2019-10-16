import ScheduleController from '../app/controllers/ScheduleController';

module.exports = (server, routes, prefix = '/schedules') => {
  routes.get('/', ScheduleController.index);

  server.use(prefix, routes);
}