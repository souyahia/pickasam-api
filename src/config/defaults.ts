export const defaults = {
  Server: {
    Https: false,
    Port: 3000,
    SSLCertificate: 'cert.pem',
    SSLPrivateKey: 'key.pem',
  },
  Database: {
    Dialect: 'mysql',
    Host: 'localhost',
    Database: 'pickasam',
    Username: 'user_dev',
    Password: 'password_dev',
  },
  Logger: {
    Level: 'info',
    Stream: 'bunyan-debug-stream',
    ShowHeaders: false,
    ShowSQL: false,
  },
  Elo: {
    KFactor: 32,
    ScaleFactor: 400,
    ExponentBase: 10,
  },
};
