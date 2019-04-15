const mapTaskErrorToHttpError = require('../error/map-task-to-http-error');
const httpError = require('../error/http');

module.exports = () =>
  (err, req, res, next) => {
    // Map express-openapi validation errors.
    if (err.status === 400 && err.errors) {
      return next(httpError({
        status: 400,
        code: 'InvalidRequestSchema',
        message: 'Request validation failed.',
        details: err.errors,
      }));
    }

    if (err.isTaskError) {
      const httpError = mapTaskErrorToHttpError(err);

      if (httpError) {
        return next(httpError);
      }
    }

    return next(err);
  };
