const mw = require('../../../lib/bootstrap/openapi-middleware');
const initAuthTokenScheme = require('../../../lib/express-openapi/security-scheme/auth-token');

/**
 *
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Client tasks
 * @param {object} logger Logging facility
 * @returns {Promise<{v1: function}>} Versioned middlewares
 */
module.exports = async ({tasks, logger}) => ({
  v1: await mw({
    path: `${__dirname}/../../../api/client/v1`,
    dependencies: {
      tasks,
    },
    securityHandlers: {
      authTokenScheme: initAuthTokenScheme({
        authenticateUser: tasks.client.authenticateUser,
        logger,
      }),
    },
  }),
});
