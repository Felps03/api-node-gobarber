import multer from 'multer';
import multerConfig from '../config/multer';

import FileController from '../app/controllers/FileController';

const upload = multer(multerConfig);

module.exports = (server, routes, prefix = '/files') => {

  console.log(server);

  routes.post('/', upload.single('file'), FileController.store);

  server.use(prefix, routes);
}