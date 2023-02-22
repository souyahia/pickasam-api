import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { sequelize } from '../sequelize';
import { EntityInitializer } from './entity-initializer';
import { PictureEntity } from './picture.entity';

export class MatchEntity extends Model<
  InferAttributes<MatchEntity>,
  InferCreationAttributes<MatchEntity>
> {
  declare id: CreationOptional<number>;
  declare uuid: string;
  declare gender: string;
  declare winner: number | null;

  declare picture_1_id: ForeignKey<PictureEntity['id']>;
  declare picture_2_id: ForeignKey<PictureEntity['id']>;

  declare picture_1: NonAttribute<PictureEntity>;
  declare picture_2: NonAttribute<PictureEntity>;

  declare static associations: {
    picture_1: Association<PictureEntity, MatchEntity>;
    picture_2: Association<PictureEntity, MatchEntity>;
  };
}

export const MatchInitializer: EntityInitializer = {
  init(): void {
    MatchEntity.init(
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
        gender: {
          type: DataTypes.STRING(7),
          allowNull: false,
        },
        winner: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'Match',
        timestamps: false,
      },
    );
  },

  initAssociations(): void {
    MatchEntity.belongsTo(PictureEntity, {
      as: 'picture_1',
      targetKey: 'id',
      foreignKey: 'picture_1_id',
    });

    MatchEntity.belongsTo(PictureEntity, {
      as: 'picture_2',
      targetKey: 'id',
      foreignKey: 'picture_2_id',
    });
  },
};
