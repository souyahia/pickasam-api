import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';
import { Config } from '../config';

export function logMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (process.env['NODE_ENV'] !== 'test') {
    res.once('finish', () => {
      const statusMessage = res.statusMessage ? ` - ${res.statusMessage}` : '';
      let message = `${req.method} ON ${req.originalUrl} (${res.statusCode}${statusMessage})`;
      if (Config.Logger.ShowHeaders) {
        message = `\n${message}Incoming Headers : ${JSON.stringify(req.headers, null, 2)}\n`;
        message = `\n${message}Outgoing Headers : ${JSON.stringify(res.getHeaders(), null, 2)}\n`;
      }
      if (res.statusCode < 400) {
        logger.info(message);
      } else {
        logger.error(message);
      }
    });
  }
  next();
}
