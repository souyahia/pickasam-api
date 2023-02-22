import { Router } from 'express';
import { NotFoundController } from '../controllers';

const NotFoundRouter = Router();

NotFoundRouter.all('*', NotFoundController.notFound);

export { NotFoundRouter };
