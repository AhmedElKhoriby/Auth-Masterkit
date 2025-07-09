import logger from 'pino';
import config from 'config';

const level = config.get<string>('logLevel');

// Create pino logger instance
const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
    },
  },
  level,
  base: {
    pid: false,
  },
});

export default log;
