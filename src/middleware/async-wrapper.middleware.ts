/* eslint-disable promise/no-callback-in-promise */
import { Request, Response, NextFunction } from 'express';

export function asyncWrapper<P, ResBody, ReqBody, ReqQuery, Locals extends Record<string, any>>(
  asyncHandler: (
    arg0: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    arg1: Response<ResBody, Locals>,
    arg2: NextFunction,
  ) => Promise<void>,
): (
  req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
  res: Response<ResBody, Locals>,
  next: NextFunction,
) => Promise<void> {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction,
  ) => {
    return Promise.resolve(asyncHandler(req, res, next)).catch(next);
  };
}
