import { Sequelize } from 'sequelize';
import { Config } from '../config';
import { logger } from '../utils';

export const sequelize = new Sequelize(
  Config.Database.Database,
  Config.Database.Username,
  Config.Database.Password,
  {
    host: Config.Database.Host,
    dialect: Config.Database.Dialect,
    logging: Config.Logger.ShowSQL ? (arg: unknown) => logger.trace(arg) : false,
  },
);
