import { Request, Response } from 'express';
import { NotFoundResponse } from './not-found.types';

export function notFound(
  req: Request<never, NotFoundResponse>,
  res: Response<NotFoundResponse>,
): void {
  const notFoundResponse: NotFoundResponse = {
    message: `Cannot ${req.method} ${req.originalUrl}`,
  };

  res.status(404).json(notFoundResponse);
}
