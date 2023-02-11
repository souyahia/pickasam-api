import { Router } from 'express';
import { helloController } from '../controllers';
import { paramsValidatorMiddleware, asyncWrapper } from '../middleware';
import { helloValidator } from '../validators';

const helloRouter = Router();

helloRouter.get('/', helloController.getHello);

helloRouter.post(
  '/:name',
  helloValidator.customHelloValidator,
  paramsValidatorMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  asyncWrapper(helloController.getCustomHello),
);

export { helloRouter };
