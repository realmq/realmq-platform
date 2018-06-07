const mw = require('../../../lib/bootstrap/openapi-middleware');

const statusUnauthorized = message => ({
  status: 401,
  challenge: 'Basic realm="Account credentials"',
  message: {error: 'unauthorized', message}
});

const base64Decode = value => Buffer.from(value, 'base64').toString();

module.exports = async ({tasks, logger}) => ({
  v1: await mw({
    path: `${__dirname}/../../../api/admin/v1`,
    dependencies: {
      tasks
    },
    securityHandlers: {
      async accountCredentialsScheme(req, scopes, definitions, callback) {
        const positiveResult = () => callback(null, true);
        const negativeResult = status => callback(status, false);

        try {
          const auth = req.headers.authorization;
          if (!auth) {
            return negativeResult(statusUnauthorized('Missing authorization'));
          }

          const [scheme, value] = auth.trim().split(' ');
          if (scheme.toLowerCase() !== 'basic') {
            return negativeResult(statusUnauthorized('Invalid authorization scheme'));
          }

          const [username, password] = base64Decode(value).split(':');
          const result = await tasks.admin.authenticateAccount({email: username, password});
          if (!result.authenticated) {
            return negativeResult(statusUnauthorized('Invalid credentials'));
          }

          req.account = result.account;
          return positiveResult();
        } catch (err) {
          logger.error(`Unexpected error on authenticating request: ${err}`, {err});
          return negativeResult({status: 500});
        }
      }
    }
  })
});
