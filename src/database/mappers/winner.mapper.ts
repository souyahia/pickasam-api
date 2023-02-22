import { Winner } from '../../models';
import { EntityMapper } from './entity-mapper';

function toModel(winnerDb: null): null;
function toModel(winnerDb: number): Winner;
function toModel(winnerDb: number | null): Winner | null {
  if (winnerDb === null) {
    return null;
  }
  if ([1, 2].includes(winnerDb)) {
    return winnerDb as Winner;
  }
  throw new Error(`Unknown databse winner value : ${winnerDb}`);
}

export const WinnerMapper: EntityMapper<Winner, number> = {
  toModel,
};
