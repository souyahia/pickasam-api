import { Sequelize } from 'sequelize';
import { v4 } from 'uuid';
import { Gender, Match, Winner } from '../../models';
import { MatchRepository } from '../../repositories';
import { MatchEntity, PictureEntity } from '../entities';
import { MatchMapper } from '../mappers';

export const MatchAdapter: MatchRepository = {
  async getMatchByUuid(uuid: string): Promise<Match | null> {
    const matchEntity = await MatchEntity.findOne({
      where: { uuid },
      include: ['picture_1', 'picture_2'],
    });
    return MatchMapper.toModel(matchEntity);
  },

  async createNewMatch(): Promise<Match> {
    const [picture1, picture2] = await PictureEntity.findAll({
      order: Sequelize.literal('rand()'),
      limit: 2,
    });

    const match = await MatchEntity.create({
      uuid: v4(),
      gender: Gender.UNKNOWN,
      winner: null,
      picture_1_id: picture1.id,
      picture_2_id: picture2.id,
    });

    match.picture_1 = picture1;
    match.picture_2 = picture2;
    return MatchMapper.toModel(match);
  },

  async updateWinner(uuid: string, winner: Winner, gender: Gender): Promise<Match | null> {
    await MatchEntity.update({ winner, gender }, { where: { uuid } });
    return this.getMatchByUuid(uuid);
  },
};
