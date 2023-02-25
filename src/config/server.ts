import { LogLevelString } from 'bunyan';
import { Dialect } from 'sequelize';
import { getBoolean, getEnum, getNumber, getString } from './provider';

export const DATABASE_DIALECT: Dialect[] = [
  'mysql',
  'postgres',
  'sqlite',
  'mariadb',
  'mssql',
  'db2',
  'snowflake',
  'oracle',
];

export const LOG_LEVEL_STRING_VALUES: LogLevelString[] = [
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
];

export enum LogStream {
  STDOUT = 'stdout',
  BUNYAN_DEBUG_STREAM = 'bunyan-debug-stream',
}

export const Config = {
  Server: {
    Port: getNumber('Server:Port'),
    Https: getBoolean('Server:Https'),
    SSLCertificate: getString('Server:SSLCertificate'),
    SSLPrivateKey: getString('Server:SSLPrivateKey'),
  },
  Database: {
    Dialect: getEnum('Database:Dialect', DATABASE_DIALECT),
    Host: getString('Database:Host'),
    Database: getString('Database:Database'),
    Username: getString('Database:Username'),
    Password: getString('Database:Password'),
  },
  Logger: {
    Level: getEnum('Logger:Level', LOG_LEVEL_STRING_VALUES),
    Stream: getEnum('Logger:Stream', LogStream),
    ShowHeaders: getBoolean('Logger:ShowHeaders'),
    ShowSQL: getBoolean('Logger:ShowSQL'),
  },
  Elo: {
    KFactor: getNumber('Elo:KFactor'),
    ScaleFactor: getNumber('Elo:ScaleFactor'),
    ExponentBase: getNumber('Elo:ExponentBase'),
  },
};
