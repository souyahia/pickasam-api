import { Request, Response } from 'express';
import { MatchAdapter, PictureAdapter } from '../../database/adapters';
import { Gender, Match, PictureStats } from '../../models';
import { GetAllPicturesResponses } from './picture.types';

function getPictureStatsByGender(
  uuid: string,
  matches: Match[],
  gender: 'all' | Gender,
): { wins: number; losses: number } {
  const genderMatches =
    gender === 'all' ? matches : matches.filter((match) => match.gender === gender);
  return {
    wins: genderMatches.filter((match) =>
      match.picture1.uuid === uuid ? match.winner === 1 : match.winner === 2,
    ).length,
    losses: genderMatches.filter((match) =>
      match.picture2.uuid === uuid ? match.winner === 1 : match.winner === 2,
    ).length,
  };
}

function getPictureStats(uuid: string, matches: Match[]): PictureStats {
  const genders: ('all' | Gender)[] = ['all', ...Object.values(Gender)];
  return genders.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: getPictureStatsByGender(uuid, matches, curr),
    }),
    {} as PictureStats,
  );
}

async function getAllPictures(
  req: Request<never, GetAllPicturesResponses>,
  res: Response<GetAllPicturesResponses>,
): Promise<void> {
  const [matches, pictures] = await Promise.all([
    MatchAdapter.getAllCompletedMatches(),
    PictureAdapter.getAllPictures(),
  ]);
  const response: GetAllPicturesResponses = pictures.map((picture) => {
    const pictureMatches = matches.filter((match) =>
      [match.picture1.uuid, match.picture2.uuid].includes(picture.uuid),
    );
    return {
      ...picture,
      uuid: picture.uuid,
      elo: picture.elo,
      stats: getPictureStats(picture.uuid, pictureMatches),
    };
  });
  res.status(200).json(response);
}

export const PictureController = {
  getAllPictures,
};
