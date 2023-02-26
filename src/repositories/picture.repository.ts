import { Picture } from '../models';
import { PictureElo } from '../models/picture-elo.model';

export interface PictureRepository {
  updateElo(uuid: string, elo: PictureElo): Promise<void>;
  getAllPictures(): Promise<Picture[]>;
}
