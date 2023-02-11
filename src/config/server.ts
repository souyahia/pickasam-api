import { getBoolean, getNumber, getString } from './provider';

export const Config = {
  Server: {
    Port: getNumber('Server:Port'),
  },
  Logger: {
    Level: getString('Logger:Level'),
    Stream: getString('Logger:Stream'),
    ShowHeaders: getBoolean('Logger:ShowHeaders'),
  },
};
