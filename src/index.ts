import { app } from './app';
import { Config } from './config';
import { sequelize } from './database';
import { logger } from './utils';

logger.debug('Establishing connection to database...');
sequelize
  .authenticate()
  .then(() => {
    logger.debug('Authentication to database successful.');

    const port = Config.Server.Port;
    logger.debug(`Starting server on port ${port}...`);
    app.listen(port, () => {
      logger.info('***************************************************');
      logger.info('');
      logger.info(`   🚀 Server is running at http://localhost:${port}`);
      logger.info('');
      logger.info(`          Try http://localhost:${port}/ping`);
      logger.info('');
      logger.info('***************************************************');
    });
  })
  .catch((error) => logger.error(error));
