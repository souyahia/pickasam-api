import { Gender } from './gender.model';
import { Picture } from './picture.model';
import { Winner } from './winner.model';

export interface Match {
  uuid: string;
  picture1: Picture;
  picture2: Picture;
  gender: Gender;
  winner?: Winner;
}
