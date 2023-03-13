const {internal: internalError} = require('../../../lib/error/http');

module.exports = ({logger}) =>
  (error, request, response, _) => {
    // Map all unknown errors to internal server errors
    if (!error.isHttpError) {
      logger.error(`Unhandled error in http call: ${error}`, {error});
      error = internalError({previous: error});
    }

    // Set challenge headers
    if (error.status === 401 && error.challenge) {
      response.set('www-authenticate', error.challenge);
    }

    const payload = {
      code: error.code,
      message: error.message,
    };

    // Include optional details
    if (error.details) {
      payload.details = error.details;
    }

    response.status(error.status).json(payload);
  };
