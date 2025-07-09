require('dotenv').config();
import express from 'express';
import config from 'config';
import log from './utils/logger';
import connectToDatabase from './utils/database';
import router from './routes';

const app = express();

app.use(router);

const port = config.get<number>('port') || 3000;
app.listen(port, async () => {
  log.info(`Server is running at http://localhost:${port}`);
  connectToDatabase();
});
