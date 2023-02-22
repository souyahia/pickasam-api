import { Picture } from '../../models';
import { PictureEntity } from '../entities';
import { EntityMapper } from './entity-mapper';

function toModel(pictureEntity: null): null;
function toModel(pictureEntity: PictureEntity): Picture;
function toModel(pictureEntity: PictureEntity | null): Picture | null {
  return pictureEntity === null
    ? null
    : {
        uuid: pictureEntity.uuid,
        elo: pictureEntity.elo,
        data: pictureEntity.data,
      };
}

export const PictureMapper: EntityMapper<Picture, PictureEntity> = {
  toModel,
};
