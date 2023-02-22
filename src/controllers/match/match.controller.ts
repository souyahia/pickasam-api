import { Request, Response } from 'express';
import { Match, Picture, Winner } from '../../models';
import { MatchAdapter, PictureAdapter } from '../../database/adapters';
import { getNextRatings } from './elo-ranking';
import {
  GetNewMatchResponse,
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

async function getNewMatch(
  req: Request<never, GetNewMatchResponse>,
  res: Response<GetNewMatchResponse>,
): Promise<void> {
  const match = await MatchAdapter.createNewMatch();
  const getNewMatchResponse: GetNewMatchResponse = {
    uuid: match.uuid,
    picture1: { uuid: match.picture1.uuid, data: match.picture1.data },
    picture2: { uuid: match.picture2.uuid, data: match.picture2.data },
  };
  res.status(201).json(getNewMatchResponse);
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

  const nextRatings = getNextRatings({
    winner: winnerPicture.elo,
    looser: looserPicture.elo,
  });

  await Promise.all([
    await PictureAdapter.updateElo(winnerPicture.uuid, nextRatings.winner),
    await PictureAdapter.updateElo(looserPicture.uuid, nextRatings.looser),
  ]);

  res.status(200).json({
    message: 'Successfully posted the match results.',
  });
}

export const MatchController = {
  getNewMatch,
  updateMatchResult,
};
