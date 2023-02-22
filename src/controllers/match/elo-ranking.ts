import { Config } from '../../config';

enum Result {
  LOOSE = 0,
  WIN = 1,
}

export interface MatchRatings {
  winner: number;
  looser: number;
}

const kFactor = Config.Elo.KFactor;
const scaleFactor = Config.Elo.ScaleFactor;
const exponentBase = Config.Elo.ExponentBase;

function getExpectedProbability(rating: number, opponentRating: number): number {
  const ratingDiff = (opponentRating - rating) / scaleFactor;
  return 1 / (1 + exponentBase ** ratingDiff);
}

function getNextRating(rating: number, opponentRating: number, result: Result): number {
  const expectedProbability = getExpectedProbability(rating, opponentRating);
  return rating + kFactor * (result - expectedProbability);
}

export function getNextRatings(ratings: MatchRatings): MatchRatings {
  return {
    winner: getNextRating(ratings.winner, ratings.looser, Result.WIN),
    looser: getNextRating(ratings.looser, ratings.winner, Result.LOOSE),
  };
}
