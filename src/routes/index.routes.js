import { Router } from 'express';

import AuthMiddleware from '../app/middlewares/auth';

import auth from './auth.routes';
import appointments from './appointments.routes';
import users from './users.routes';
import provider from './provider.routes';
import schedule from './schedule.routes';
import file from './file.routes';

module.exports = server => {

  auth(server, new Router());

  server.use(AuthMiddleware, (req, res, next) => {
    appointments(server, new Router());
    auth(server, new Router());
    file(server, new Router());
    provider(server, new Router());
    schedule(server, new Router());
    users(server, new Router());

    next();
  });
}
