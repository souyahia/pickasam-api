import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { PingRouter, NotFoundRouter, MatchRouter } from './routers';
import { logMiddleware, errorHandlerMiddleware } from './middleware';

const app = express();

app.use(cors());
app.use(logMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));

// Add your middlewares here.

app.use('/ping', PingRouter);
app.use('/match', MatchRouter);
app.use('*', NotFoundRouter);

app.use(errorHandlerMiddleware);

export { app };
