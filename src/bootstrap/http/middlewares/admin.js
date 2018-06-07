const mw = require('../../../lib/bootstrap/openapi-middleware');

const statusUnauthorized = message => ({
  status: 401,
  challenge: 'Basic realm="Account credentials"',
  message: {error: 'unauthorized', message}
});

const positiveResult = () => [null, true];
const negativeResult = status => [status, false];

module.exports = async ({tasks, logger}) => ({
  v1: await mw({
    path: `${__dirname}/../../../api/admin/v1`,
    dependencies: {
      tasks
    },
    securityHandlers: {
      accountCredentialsScheme: (req, scopes, definitions, callback) => {
        (async () => {
          const auth = req.headers.authorization;
          if (!auth) {
            return [statusUnauthorized('Missing authorization'), false];
          }
          const [scheme, value] = auth.trim().split(' ');
          if (scheme.toLowerCase() !== 'basic') {
            return negativeResult(statusUnauthorized('Invalid authorization scheme'));
          }
          const [username, password] = Buffer.from(value, 'base64').toString().split(':');

          const result = await tasks.admin.authenticateAccount(username, password);
          if (!result.authenticated) {
            return negativeResult(statusUnauthorized('Invalid credentials'));
          }

          req.account = result.account;
          return positiveResult();
        })()
          .then(([status, statisfied]) => callback(status, statisfied))
          .catch(err => {
            logger.error(`Unexpected error on authenticating request: ${err}`, {err});
            callback({status: 500}, false);
          });
      }
    }
  })
});
