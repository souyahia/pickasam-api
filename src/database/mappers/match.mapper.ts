import { Match } from '../../models';
import { MatchEntity } from '../entities';
import { EntityMapper } from './entity-mapper';
import { GenderMapper } from './gender.mapper';
import { PictureMapper } from './picture.mapper';
import { WinnerMapper } from './winner.mapper';

function toModel(matchEntity: null): null;
function toModel(matchEntity: MatchEntity): Match;
function toModel(matchEntity: MatchEntity | null): Match | null {
  if (!matchEntity) {
    return null;
  }
  const match: Match = {
    uuid: matchEntity.uuid,
    gender: GenderMapper.toModel(matchEntity.gender),
    picture1: PictureMapper.toModel(matchEntity.picture_1),
    picture2: PictureMapper.toModel(matchEntity.picture_2),
  };

  if (matchEntity.winner !== null) {
    match.winner = WinnerMapper.toModel(matchEntity.winner);
  }

  return match;
}

export const MatchMapper: EntityMapper<Match, MatchEntity> = {
  toModel,
};
