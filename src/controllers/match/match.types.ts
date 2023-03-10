import { Picture, Gender, Winner } from '../../models';

export type PictureDto = Omit<Picture, 'elo'>;

export type CreateMatchResponse = {
  uuid: string;
  picture1: PictureDto;
  picture2: PictureDto;
};

export type CreateMatchRequestBody = {
  gender: Gender;
};

export interface UpdateMatchResultURLParams {
  uuid: string;
}

export interface UpdateMatchResultRequestBody {
  winner: Winner;
  gender: Gender;
}

export interface UpdateMatchResultResponse {
  message: string;
}
