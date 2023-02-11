import { app } from './app';
import { Config } from './config';
import { logger } from './utils';

const port = Config.Server.Port;

logger.debug(`Starting server on port ${port}...`);
const server = app.listen(port, () => {
  logger.info('***************************************************');
  logger.info('');
  logger.info(`   🚀 Server is running at http://localhost:${port}`);
  logger.info('');
  logger.info(`          Try http://localhost:${port}/ping`);
  logger.info('');
  logger.info('***************************************************');
});

export default server;
