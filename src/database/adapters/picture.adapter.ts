import { Gender, Picture } from '../../models';
import { PictureElo } from '../../models/picture-elo.model';
import { PictureRepository } from '../../repositories';
import { PictureEntity } from '../entities';
import { PictureMapper } from '../mappers';

export const PictureAdapter: PictureRepository = {
  async updateElo(uuid: string, elo: PictureElo): Promise<void> {
    await PictureEntity.update(
      {
        elo: elo.all,
        elo_male: elo[Gender.MALE],
        elo_female: elo[Gender.FEMALE],
        elo_other: elo[Gender.OTHER],
        elo_unknown: elo[Gender.UNKNOWN],
      },
      { where: { uuid } },
    );
  },

  async getAllPictures(): Promise<Picture[]> {
    const pictureEntities = await PictureEntity.findAll();
    return pictureEntities.map((pictureEntity) => PictureMapper.toModel(pictureEntity));
  },
};
