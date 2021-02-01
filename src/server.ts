import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import logger from './helpers/logger';
import routes from './routes';

const createServer = (): Application => {
  // ===== DB Connection =============//
  const dbUri = process.env.DB_URI || '';

  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  const db = mongoose.connection;
  db.on('error', (error) => logger.error('MongoDB connection error:', error));
  db.once('open', function () {
    logger.info('MongoDB database connection established successfully');
  });

  // ==========END db connection===============//

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
  // ==========END middlewares ===============//

  // ======= Routes Inits ======= //
  app.get('/', (_, res) => {
    res.status(200).send({
      message: 'Pet Finder 2000 API',
      status: 'success',
    });
  });

  app.use('/api', routes);

  app.use('*', (req, res) =>
    res.status(404).send({
      message: 'route not found',
      status: 'error',
    })
  );

  // ==========END routes===============//

  return app;
};

export default createServer;
