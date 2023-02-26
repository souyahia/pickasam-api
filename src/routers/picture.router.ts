import { Router } from 'express';
import { PictureController } from '../controllers/picture';
import { asyncWrapper } from '../middleware';

const PictureRouter = Router();

PictureRouter.get('/', asyncWrapper(PictureController.getAllPictures));

export { PictureRouter };
