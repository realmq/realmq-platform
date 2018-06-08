const mw = require('../../../lib/bootstrap/openapi-middleware');
const initAccountCredentialsScheme = require('../../../lib/express-openapi/security-scheme/account-credentials');

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
      accountCredentialsScheme: initAccountCredentialsScheme({
        authenticateAccount: tasks.client.authenticateUser,
        logger,
      }),
    },
  }),
});
