const mw = require('../../../lib/bootstrap/openapi-middleware');
const initAuthTokenScheme = require('../../../lib/express-openapi/security-scheme/auth-token');
const mappers = require('../../../api/client/v1/mappers');

/**
 *
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Client tasks
 * @param {object} logger Logging facility
 * @returns {Promise<{v1: function}>} Versioned middlewares
 */
module.exports = async ({tasks, logger}) => ({
  v1: await mw({
    logger,
    path: `${__dirname}/../../../api/client/v1`,
    dependencies: {
      tasks,
      mappers,
    },
    securityHandlers: {
      authTokenScheme: initAuthTokenScheme({
        authenticateUser: tasks.client.authenticateUser,
        logger,
      }),
    },
  }),
});
