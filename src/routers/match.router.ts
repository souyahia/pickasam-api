import { Router } from 'express';
import { MatchController } from '../controllers';
import { asyncWrapper, paramsValidatorMiddleware } from '../middleware';
import { matchValidator } from '../validators';

const MatchRouter = Router();

MatchRouter.get('/', asyncWrapper(MatchController.getNewMatch));

MatchRouter.patch(
  '/:uuid',
  matchValidator.postMatchResultValidator,
  paramsValidatorMiddleware,
  asyncWrapper(MatchController.updateMatchResult),
);

export { MatchRouter };
