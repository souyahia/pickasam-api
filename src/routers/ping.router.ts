import { Router } from 'express';
import { PingController } from '../controllers';

const PingRouter = Router();

PingRouter.get('/', PingController.ping);

export { PingRouter };
