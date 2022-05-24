import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import httpStatus from 'http-status';
import statusMonitor from 'express-status-monitor'

import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.js';
import { ApiError } from './utils/Error.js';

dotenv.config();

const app = express();

app.use(statusMonitor());

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// enable cors
app.use(cors({
  "origin": "*",
  "methods": "GET, HEAD"
}));

app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  if (!req.path.includes('socket')) {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
});

// handle error
app.use(errorHandler);

export default app;
