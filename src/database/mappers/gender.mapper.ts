import { Gender } from '../../models';
import { EntityMapper } from './entity-mapper';

function toModel(genderDb: null): null;
function toModel(genderDb: string): Gender;
function toModel(genderDb: string | null): Gender | null {
  if (!genderDb) {
    return null;
  }
  const gender = Object.values(Gender).find((value) => value === genderDb);
  if (!gender) {
    throw new Error(`Unknown databse gender value : ${genderDb}`);
  }
  return gender;
}

export const GenderMapper: EntityMapper<Gender, string> = {
  toModel,
};
