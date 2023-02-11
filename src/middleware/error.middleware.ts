import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils';

interface InternalServerErrorResponse {
  message: string;
}

export function errorHandlerMiddleware(
  err: Error,
  req: Request<never, InternalServerErrorResponse>,
  res: Response<InternalServerErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  logger.error(err);
  const internalServerErrorResponse: InternalServerErrorResponse = {
    message: 'Internal Server Error',
  };
  res.status(500).json(internalServerErrorResponse);
}
