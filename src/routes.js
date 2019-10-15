import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware  from './app/middlewares/auth';
import ScheduleController from './app/controllers/ScheduleController';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/user', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/provider', ProviderController.index);


routes.post('/appointment', AppointmentController.store);
routes.get('/appointment', AppointmentController.index);
routes.get('/schedule', ScheduleController.index);

export default routes;