import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';

interface InvalidParamsResponse {
  message: string;
  errors: ValidationError[];
}

export function paramsValidatorMiddleware(
  req: Request<never, InvalidParamsResponse>,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const invalidParamsResponse: InvalidParamsResponse = {
      message: 'Invalid request parameters.',
      errors: errors.array(),
    };
    res.status(422).json(invalidParamsResponse);
  } else {
    next();
  }
}
