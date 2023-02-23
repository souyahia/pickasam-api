import { Router } from 'express';
import { MatchController } from '../controllers';
import { asyncWrapper, paramsValidatorMiddleware } from '../middleware';
import { MatchValidator } from '../validators';

const MatchRouter = Router();

MatchRouter.post(
  '/',
  MatchValidator.createMatch,
  paramsValidatorMiddleware,
  asyncWrapper(MatchController.createMatch),
);

MatchRouter.patch(
  '/:uuid',
  MatchValidator.updateMatchResult,
  paramsValidatorMiddleware,
  asyncWrapper(MatchController.updateMatchResult),
);

export { MatchRouter };
