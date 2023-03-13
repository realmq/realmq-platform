const {notFound: notFoundError} = require('../../../lib/error/http');

module.exports = () =>
  (request, response, next) => next(notFoundError({path: request.path}));
