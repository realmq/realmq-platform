const mapTaskErrorToHttpError = require('../error/map-task-to-http-error');
const httpError = require('../error/http');

module.exports = () =>
  (error, request, response, next) => {
    // Map express-openapi validation errors.
    if (error.status === 400 && error.errors) {
      return next(httpError({
        status: 400,
        code: 'InvalidRequestSchema',
        message: 'Request validation failed.',
        details: error.errors,
      }));
    }

    if (error.isTaskError) {
      const httpError = mapTaskErrorToHttpError(error);

      if (httpError) {
        return next(httpError);
      }
    }

    return next(error);
  };
