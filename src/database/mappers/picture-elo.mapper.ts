import { Gender } from '../../models';
import { PictureElo } from '../../models/picture-elo.model';
import { PictureEntity } from '../entities';
import { EntityMapper } from './entity-mapper';

function toModel(pictureEntity: null): null;
function toModel(pictureEntity: PictureEntity): PictureElo;
function toModel(pictureEntity: PictureEntity | null): PictureElo | null {
  return pictureEntity === null
    ? null
    : {
        all: pictureEntity.elo,
        [Gender.MALE]: pictureEntity.elo_male,
        [Gender.FEMALE]: pictureEntity.elo_female,
        [Gender.OTHER]: pictureEntity.elo_other,
        [Gender.UNKNOWN]: pictureEntity.elo_unknown,
      };
}

export const PictureEloMapper: EntityMapper<PictureElo, PictureEntity> = {
  toModel,
};
