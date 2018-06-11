module.exports = ({logger}) =>
  (err, req, res, _) => {
    logger.error(`Unhandled error in http call: ${err}`, {err});
    res.status(500).json({
      code: 'InternalServerError',
      message: 'The request could not be processed.',
    });
  };
