const path = require('node:path');
const mw = require('../../../lib/bootstrap/openapi-middleware');
const mappers = require('../../../api/admin/v1/mappers');
const initFixedApiKeyScheme = require('../../../lib/express-openapi/security-scheme/fixed-api-key');

/**
 *
 * @param {object} args
 * @param {{api: {admin: {key: string}}}} args.config Config containing fixed api key to use for authorization in `api.admin.key`
 * @param {object} args.tasks Tasks
 * @param {AdminTasks} args.tasks.admin Admin tasks
 * @param {object} args.logger Logging facility
 * @returns {Promise<{v1: function}>} Versioned middlewares
 */
module.exports = async ({config, tasks, logger}) => ({
  v1: await mw({
    logger,
    path: path.join(__dirname, '/../../../api/admin/v1'),
    dependencies: {
      tasks,
      mappers,
    },
    securityHandlers: {
      apiKeyScheme: initFixedApiKeyScheme({
        apiKey: config.api.admin.key,
        logger,
      }),
    },
  }),
});
