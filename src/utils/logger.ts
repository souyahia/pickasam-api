import { join } from 'path';
import { createLogger, Serializers } from 'bunyan';
import bunyanDebugStream, { BunyanDebugStreamOptions } from 'bunyan-debug-stream';
import { Config, LogStream } from '../config';

type BunyanDebugStreamTypeWrapper = ((
  options: BunyanDebugStreamOptions,
) => NodeJS.WritableStream) & { serializers: Serializers };

const bds = bunyanDebugStream as BunyanDebugStreamTypeWrapper;

function getStream(key: LogStream): NodeJS.WritableStream {
  switch (key) {
    case LogStream.STDOUT:
      return process.stdout;
    case LogStream.BUNYAN_DEBUG_STREAM:
      return bds({
        basepath: join(__dirname, '..', '..'),
        forceColor: true,
      });
    default:
      throw new Error(`Unknown logger stream type.`);
  }
}

export const logger = createLogger({
  name: 'pickasam-api',
  level: Config.Logger.Level,
  streams: [
    {
      level: Config.Logger.Level,
      stream: getStream(Config.Logger.Stream),
    },
  ],
  serializers: bds.serializers,
});
