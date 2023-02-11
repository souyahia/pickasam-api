import { body } from 'express-validator';
import { HelloLang } from '../controllers/hello/hello.types';

export const customHelloValidator = [
  body('lang').isIn(Object.values(HelloLang)),
  body('withDate').isBoolean().optional(),
];
