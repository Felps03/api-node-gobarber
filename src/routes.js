import { Router } from 'express';
import multer from 'multer';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import validateUserStore from '../src/app/validators/UserStore';
import validateUserUpdate from '../src/app/validators/UserUpdate';
import validateSessionStore from '../src/app/validators/SessionStore';
import validateAppointmentStore from '../src/app/validators/AppointmentStore';

const routes = Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_POST
});

const bruteForce = new Brute(bruteStore);

/**
 * @api {post} / API User
 * @apiGroup User
 * @apiSuccess {String} status Mensagem de status da API
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "NTask API"
 *    }
 */

routes.post('/user', validateUserStore, UserController.store);
routes.post('/sessions', bruteForce.prevent, validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/user', validateUserUpdate, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/provider', ProviderController.index);
routes.get('/provider/:providerId/available', AvailableController.index);


routes.post('/appointment', validateAppointmentStore, AppointmentController.store);
routes.get('/appointment', AppointmentController.index);
routes.delete('/appointment/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);


routes.get('/notification', NotificationController.index);
routes.put('/notification/:id', NotificationController.update);


export default routes;
