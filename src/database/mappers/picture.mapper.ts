import { Picture } from '../../models';
import { PictureEntity } from '../entities';
import { EntityMapper } from './entity-mapper';
import { PictureEloMapper } from './picture-elo.mapper';

function toModel(pictureEntity: null): null;
function toModel(pictureEntity: PictureEntity): Picture;
function toModel(pictureEntity: PictureEntity | null): Picture | null {
  return pictureEntity === null
    ? null
    : {
        uuid: pictureEntity.uuid,
        elo: PictureEloMapper.toModel(pictureEntity),
        data: pictureEntity.data,
      };
}

export const PictureMapper: EntityMapper<Picture, PictureEntity> = {
  toModel,
};
