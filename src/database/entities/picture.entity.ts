import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { EntityInitializer } from './entity-initializer';
import { MatchEntity } from './match.entity';

class PictureEntity extends Model {
  declare id: CreationOptional<number>;
  declare uuid: string;
  declare elo: number;
  declare elo_male: number;
  declare elo_female: number;
  declare elo_other: number;
  declare elo_unknown: number;
  declare data: Buffer;
}

export const PictureInitializer: EntityInitializer = {
  init(): void {
    PictureEntity.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        uuid: {
          type: DataTypes.UUIDV4,
          allowNull: false,
          unique: true,
        },
        elo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        elo_male: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        elo_female: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        elo_other: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        elo_unknown: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        data: {
          type: DataTypes.BLOB('long'),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Picture',
        timestamps: false,
      },
    );
  },

  initAssociations(): void {
    PictureEntity.hasMany(MatchEntity, {
      sourceKey: 'id',
      foreignKey: 'picture_1_id',
    });

    PictureEntity.hasMany(MatchEntity, {
      sourceKey: 'id',
      foreignKey: 'picture_2_id',
    });
  },
};

export { PictureEntity };
