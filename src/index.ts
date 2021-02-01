import dotenv from 'dotenv';
import logger from './helpers/logger';
import createServer from './server';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 5000;

const server = createServer();
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

server.listen(port, () =>
  logger.info(`
  ################################################
  🔥  Server listening on port: ${port} 🔥
  ################################################
`)
);
