import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const loggerFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
);

const meta = { service: 'meca' };

const infoLogger = createLogger({
  defaultMeta: meta,
  format: loggerFormat,
  transports: [
    new transports.DailyRotateFile({
      level: 'info',
      filename: `logs/access-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
    }),
  ],
});

const errorLogger = createLogger({
  defaultMeta: meta,
  format: loggerFormat,
  transports: [
    new transports.File({
      level: 'error',
      filename: `logs/error.log`,
      maxsize: 5242880,
    }),
  ],
});

const logger = {
  info: (params: any) => infoLogger.info(params),
  error: (params: any) => errorLogger.error(params),
};

export default logger;
