const {internal: internalError} = require('../../../lib/error/http');

module.exports = ({logger}) =>
  (error, req, res, _) => {
    // Map all unknown errors to internal server errors
    if (!error.isHttpError) {
      logger.error(`Unhandled error in http call: ${error}`, {error});
      error = internalError({previous: error});
    }

    // Set challenge headers
    if (error.status === 401 && error.challenge) {
      res.set('www-authenticate', error.challenge);
    }

    const response = {
      code: error.code,
      message: error.message,
    };

    // Include optional details
    if (error.details) {
      response.details = error.details;
    }

    res.status(error.status).json(response);
  };
