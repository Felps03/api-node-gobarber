import express from 'express';
import path from 'path';

// import routes from './routes/index.routes';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes() {
    // routes(this.server);
    this.server.use(routes);
  }
}

export default new App().server;
