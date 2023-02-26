import { PictureStats } from './picture-stats.model';
import { Picture } from './picture.model';

export interface PictureWithStats extends Picture {
  stats: PictureStats;
}
