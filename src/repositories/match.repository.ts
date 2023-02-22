import { Gender, Match, Winner } from '../models';

export interface MatchRepository {
  getMatchByUuid: (uuid: string) => Promise<Match | null>;
  createNewMatch: () => Promise<Match>;
  updateWinner: (uuid: string, winner: Winner, gender: Gender) => Promise<Match | null>;
}
