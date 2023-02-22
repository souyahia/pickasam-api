import { PictureRepository } from '../../repositories';
import { PictureEntity } from '../entities';

export const PictureAdapter: PictureRepository = {
  updateElo: async (uuid: string, elo: number) => {
    await PictureEntity.update({ elo }, { where: { uuid } });
  },
};
