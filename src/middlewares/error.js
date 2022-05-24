import httpStatus from 'http-status';

import config from '../config/config.js';
import logger from '../config/logger.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  const response = {
    code: statusCode,
    msg: message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export {
  errorHandler
};
