import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const getLogger = () => {
  const fileLogTransport = new transports.DailyRotateFile({
    filename: `logs/access-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
  });

  const errorLogTransport = new transports.File({
    level: 'error',
    filename: `logs/error.log`,
    maxsize: 5242880,
  });

  const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
    ),
    defaultMeta: { service: 'meca' },
  });

  if (process.env.NODE_ENV === 'production') {
    logger.add(fileLogTransport).add(errorLogTransport);
  }

  return logger;
};

export default getLogger();
