import { Request, Response } from 'express';
import { Match, Picture, Winner } from '../../models';
import { MatchAdapter, PictureAdapter } from '../../database/adapters';
import { PictureElo } from '../../models/picture-elo.model';
import { getNextRatings } from './elo-ranking';
import {
  CreateMatchResponse,
  CreateMatchRequestBody,
  UpdateMatchResultResponse,
  UpdateMatchResultRequestBody,
  UpdateMatchResultURLParams,
} from './match.types';

function getWinnerPicture(match: Match, winner: Winner): Picture {
  return winner === 1 ? match.picture1 : match.picture2;
}

function getLooserPicture(match: Match, winner: Winner): Picture {
  return winner === 1 ? match.picture2 : match.picture1;
}

async function createMatch(
  req: Request<never, CreateMatchResponse, CreateMatchRequestBody>,
  res: Response<CreateMatchResponse>,
): Promise<void> {
  const match = await MatchAdapter.createMatch(req.body.gender);
  const createMatchResponse: CreateMatchResponse = {
    uuid: match.uuid,
    picture1: { uuid: match.picture1.uuid, data: match.picture1.data },
    picture2: { uuid: match.picture2.uuid, data: match.picture2.data },
  };
  res.status(201).json(createMatchResponse);
}

export async function updateMatchResult(
  req: Request<UpdateMatchResultURLParams, UpdateMatchResultResponse, UpdateMatchResultRequestBody>,
  res: Response<UpdateMatchResultResponse>,
): Promise<void> {
  const { uuid } = req.params;
  const { winner, gender } = req.body;

  const match = await MatchAdapter.updateWinner(uuid, winner, gender);

  if (!match) {
    res.status(404).json({
      message: `Match with uuid ${uuid} not found.`,
    });
    return;
  }

  const winnerPicture = getWinnerPicture(match, winner);
  const looserPicture = getLooserPicture(match, winner);

  const nextAllRatings = getNextRatings({
    winner: winnerPicture.elo.all,
    looser: looserPicture.elo.all,
  });

  const nextGenderRatings = getNextRatings({
    winner: winnerPicture.elo[match.gender],
    looser: looserPicture.elo[match.gender],
  });

  const nextWinnerElo: PictureElo = {
    ...winnerPicture.elo,
    all: nextAllRatings.winner,
    [match.gender]: nextGenderRatings.winner,
  };

  const nextLooserElo: PictureElo = {
    ...looserPicture.elo,
    all: nextAllRatings.looser,
    [match.gender]: nextGenderRatings.looser,
  };

  await Promise.all([
    await PictureAdapter.updateElo(winnerPicture.uuid, nextWinnerElo),
    await PictureAdapter.updateElo(looserPicture.uuid, nextLooserElo),
  ]);

  res.status(200).json({
    message: 'Successfully posted the match results.',
  });
}

export const MatchController = {
  createMatch,
  updateMatchResult,
};
