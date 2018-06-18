const {notFound: notFoundError} = require('../../../lib/error/http');

module.exports = () =>
  (req, res, next) => next(notFoundError({path: req.path}));
