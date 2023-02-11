import express from 'express';
import { json, urlencoded } from 'body-parser';
import { pingRouter, helloRouter, notFoundRouter } from './routers';
import { logMiddleware, errorHandlerMiddleware } from './middleware';

const app = express();

app.use(logMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));

// Add your middlewares here.

app.use('/ping', pingRouter);
app.use('/hello', helloRouter);
app.use('*', notFoundRouter);

app.use(errorHandlerMiddleware);

export { app };
