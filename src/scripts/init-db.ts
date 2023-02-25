/**
 * This script is used to initiate the AWS RDS database with the picture data. It loads pictures from a local directory
 * and inserts rows in the MySQL database. The connection to the RDS database can be configured using environment
 * variables (see CONTRIBUTING.md for more details on project configuration). This script assumes the database tables
 * have already been created.
 *
 * Usage : yarn build && yarn run script:init-db path/to/pictures
 */

const startTs = Date.now();

import * as Buffer from 'buffer';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { v4 } from 'uuid';
import { sequelize } from '../database';
import { PictureEntity } from '../database/entities';
import { logger } from '../utils';

function loadPictures(pictureDir: string): Buffer[] {
  if (!pictureDir || !existsSync(pictureDir)) {
    throw new Error(`Picture directory ${pictureDir} does not exist.`);
  }
  return readdirSync(pictureDir).map((filename) => {
    if (!filename.endsWith('.jpg')) {
      throw new Error(`Invalid file extension : ${filename} (only .jpg are allowed).`);
    }
    const data = readFileSync(join(pictureDir, filename));
    logger.info(`Successfully loaded picture ${filename}`);
    return data;
  });
}

async function createPictureEntity(data: Buffer): Promise<void> {
  const pictureEntity = await PictureEntity.create({
    uuid: v4(),
    elo: 1400,
    data,
  });
  logger.info(`Successfully created picture #${pictureEntity.id} (${pictureEntity.uuid})`);
}

async function initDb(pictureDir: string): Promise<void> {
  await Promise.all(loadPictures(pictureDir).map((data) => createPictureEntity(data)));
}

logger.debug('Establishing connection to database...');
sequelize
  .authenticate()
  .then(async () => {
    logger.debug('Authentication to database successful.');
    await initDb(process.argv[2]);
  })
  .catch((error) => logger.error(error))
  .finally(async () => {
    await sequelize.close();
    logger.info(`⚡️ Done in ${Date.now() - startTs}ms`);
  });
