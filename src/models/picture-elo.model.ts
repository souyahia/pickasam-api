import { Gender } from './gender.model';

export type PictureElo = {
  [key in Gender | 'all']: number;
};
