const {internal: internalError} = require('../../../lib/error/http');

module.exports = ({logger}) =>
  (err, req, res, _) => {
    if (!err.isHttpError) {
      logger.error(`Unhandled error in http call: ${err}`, {err});
      err = internalError({previous: err});
    }

    res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  };
