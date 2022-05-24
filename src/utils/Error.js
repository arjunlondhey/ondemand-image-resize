class ApiError extends Error {
  constructor(statusCode = '500', message = 'Internal Server Error', stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ParamMissingError extends Error {
  constructor(statusCode, message, stack = '') {
    super(message);
    this.statusCode = statusCode || 500;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class InvalidInputError extends Error {
  constructor(statusCode, message, stack = '') {
    super(message);
    this.statusCode = statusCode || 400;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError, ParamMissingError, InvalidInputError };
