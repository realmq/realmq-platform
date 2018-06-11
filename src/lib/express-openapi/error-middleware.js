const mapTaskErrorToHttpError = require('../error/map-task-to-http-error');

module.exports = ({logger}) =>
  (err, req, res, _) => {
    // Map express-openapi validation errors.
    if (err.status === 400 && err.errors) {
      return res.status(400).json({
        code: 'InvalidRequestSchema',
        message: 'Request validation failed.',
        details: err.errors,
      });
    }

    if (err.isTaskError) {
      const httpError = mapTaskErrorToHttpError(err);

      if (httpError) {
        return res.status(httpError.status).json({
          code: httpError.code,
          message: httpError.message,
        });
      }
    }

    logger.error(`Unhandled error in http call: ${err}`, {err});
    res.status(500).json({
      code: 'InternalServerError',
      message: 'The request could not be processed.',
    });
  };
