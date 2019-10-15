import { Router } from 'express';

import AuthMiddleware from '../app/middlewares/auth';

import auth from './auth.routes';
import appointments from './appointments.routes';
import users from './users.routes';
import provider from './provider.routes';
import schedule from './schedule.routes';
import file from './file.routes';

module.exports = server => {

  auth(server, Router);

  server.use(AuthMiddleware, (req, res, next) => {
    appointments(server, Router);
    auth(server, Router);
    file(server, Router);
    provider(server, Router);
    schedule(server, Router);
    users(server, Router);

    next();
  });
}