import ProviderController from '../app/controllers/ProviderController';

module.exports = (server, routes, prefix = '/providers') => {
  routes.get('/', ProviderController.index);

  server.use(prefix, routes);
}