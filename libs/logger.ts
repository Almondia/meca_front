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

export interface LoggerParams {
  requestType: string;
  location?: string;
  tag: string;
  message: string;
}

const getRemovedNextDataPathLocation = (location: string) => {
  const nextDataPath = `_next/data/${process.env.NODE_ENV}`;
  return location.replace(nextDataPath, '');
};

const logger = {
  info: ({ requestType, location = '', tag, message }: LoggerParams) =>
    infoLogger.info(`[${requestType}] ${getRemovedNextDataPathLocation(location)}, [${tag}] ${message}`),
  error: ({ requestType, location = '', tag, message }: LoggerParams) =>
    errorLogger.error(`[${requestType}] ${getRemovedNextDataPathLocation(location)}, [${tag}] ${message}`),
};

export async function responseTimeLoggerWrapper<T>(
  promiseCallback: () => Promise<T>,
  { requestType, location }: Pick<LoggerParams, 'requestType' | 'location'>,
) {
  const now = Date.now();
  const response = await promiseCallback();
  logger.info({ requestType, location, tag: 'RES-TIME', message: `${Date.now() - now}ms` });
  return response;
}

export default logger;
