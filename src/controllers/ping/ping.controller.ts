import { Request, Response } from 'express';
import { PingResponse } from './ping.types';

export function ping(req: Request<never, PingResponse>, res: Response<PingResponse>): void {
  const pingResponse: PingResponse = {
    message: 'Greetings from express-ts-template web server.',
    date: new Date().toISOString(),
    url: req.originalUrl,
  };

  res.status(200).json(pingResponse);
}
