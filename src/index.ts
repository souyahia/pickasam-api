import { readFileSync } from 'fs';
import https from 'https';
import { app } from './app';
import { Config } from './config';
import { sequelize } from './database';
import { logger } from './utils';

const port = Config.Server.Port;
const isHttps = Config.Server.Https;

function listeningCallback(): void {
  const http = isHttps ? 'https' : 'http';
  logger.info('***************************************************');
  logger.info('');
  logger.info(`   🚀 Server is running at ${http}://localhost:${port}`);
  logger.info('');
  logger.info(`          Try ${http}://localhost:${port}/ping`);
  logger.info('');
  logger.info('***************************************************');
}

logger.debug('Establishing connection to database...');
sequelize
  .authenticate()
  .then(() => {
    logger.debug('Authentication to database successful.');

    if (isHttps) {
      logger.debug('Loading SSL certificates...');
      const key = readFileSync(Config.Server.SSLPrivateKey);
      const cert = readFileSync(Config.Server.SSLCertificate);

      logger.debug(`Starting server on port ${port}...`);
      https.createServer({ key, cert }, app).listen(Config.Server.Port, listeningCallback);
    } else {
      logger.debug(`Starting server on port ${port}...`);
      app.listen(port, listeningCallback);
    }
  })
  .catch((error) => logger.error(error));
