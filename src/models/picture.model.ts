import { PictureElo } from './picture-elo.model';

export interface Picture {
  uuid: string;
  elo: PictureElo;
  data: Buffer;
}
