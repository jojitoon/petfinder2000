import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
const createServer = (): Application => {
  const app = express();

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

  // ======= Routes Inits ======= //
  app.get('/', (_, res) => {
    res.status(200).send({
      message: 'Pet Finder 2000 API',
      status: 'success',
    });
  });

  app.use('*', (req, res) =>
    res.status(404).send({
      message: 'route not found',
      status: 'error',
    })
  );
  return app;
};

export default createServer;
