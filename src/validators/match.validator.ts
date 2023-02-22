import { body, param } from 'express-validator';
import { Gender } from '../models';

const WINNER_VALUES = [1, 2];
const GENDER_VALUES = Object.values(Gender);

export const postMatchResultValidator = [
  param('uuid').isUUID(4),
  body('winner').isIn(WINNER_VALUES),
  body('gender').isIn(GENDER_VALUES),
];
