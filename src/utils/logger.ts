import { join } from 'path';
import { createLogger, LogLevelString, Serializers } from 'bunyan';
import bunyanDebugStream, { BunyanDebugStreamOptions } from 'bunyan-debug-stream';
import { Config } from '../config';

type BunyanDebugStreamTypeWrapper = ((
  options: BunyanDebugStreamOptions,
) => NodeJS.WritableStream) & { serializers: Serializers };

const bds = bunyanDebugStream as BunyanDebugStreamTypeWrapper;

function getStream(key: string): NodeJS.WritableStream {
  switch (key) {
    case 'stdout':
      return process.stdout;
    case 'bunyan-debug-stream':
      return bds({
        basepath: join(__dirname, '..', '..'),
        forceColor: true,
      });
    default:
      throw new Error(`Unknown logger stream : ${key}`);
  }
}

const level = Config.Logger.Level;

if (!['trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(level)) {
  throw new Error(`Unknown logger level : ${level}`);
}

export const logger = createLogger({
  name: 'pickasam-api',
  level: level as LogLevelString,
  streams: [
    {
      level: level as LogLevelString,
      stream: getStream(Config.Logger.Stream),
    },
  ],
  serializers: bds.serializers,
});
