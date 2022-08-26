const httpError = require('../../error/http');

const unauthorizedError = message => httpError.unauthorized({
  challenge: 'Bearer',
  code: 'InvalidAuthorization',
  message,
});

module.exports = ({apiKey, logger}) => {
  if (!apiKey) {
    logger.warn('Use fixed-api-key security scheme with empty key');
    // No access restriction
    return (req, res, next) => next();
  }

  return async req => {
    const authorizationValue = req.headers.authorization;
    if (!authorizationValue) {
      throw unauthorizedError('Missing authorization');
    }

    const [scheme, presentedApiKey] = authorizationValue.trim().split(' ');
    if (scheme.toLowerCase() !== 'bearer' || !presentedApiKey) {
      return Promise.reject(unauthorizedError('Invalid authorization scheme'));
    }

    if (presentedApiKey !== apiKey) {
      throw unauthorizedError('Invalid credentials');
    }

    return true;
  };
};
