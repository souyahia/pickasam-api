import { Router } from 'express';
import { notFoundController } from '../controllers';

const notFoundRouter = Router();

notFoundRouter.all('*', notFoundController.notFound);

export { notFoundRouter };
