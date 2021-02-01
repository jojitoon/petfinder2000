import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import path from 'path';

const createServer = (): Application => {
  const app = express();
  app.use(express.static(path.join(__dirname, '..', 'client/build')));

  // ======= Middlewares ======= //
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use((req, res, next) => {
    return bodyParser.json()(req, res, (err) => {
      if (err) {
        return res.status(400).send({
          message: 'Invalid JSON payload passed.',
          status: 'error',
          data: null,
        });
      }
      return next();
    });
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  // ==========END middlewares ===============//

  // ======= Routes Inits ======= //
  app.get('/api', (_, res) => {
    res.status(200).send({
      message: 'Pet Finder 2000 API',
      status: 'success',
    });
  });

  app.use('/api', routes);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  // ==========END routes===============//

  return app;
};

export default createServer;
