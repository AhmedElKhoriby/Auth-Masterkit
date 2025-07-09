import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connectToDatabase() {
  const dbUri = config.get<string>('dbUri');
  try {
    await mongoose.connect(dbUri);
    log.info('Connected to the database successfully');
  } catch (error) {
    log.info('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
}

export default connectToDatabase;
