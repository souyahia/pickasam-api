import { Gender } from './gender.model';

export type PictureStats = {
  [key in Gender | 'all']: {
    wins: number;
    losses: number;
  };
};
