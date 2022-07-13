const mw = require('../../../lib/bootstrap/openapi-middleware');
const mappers = require('../../../api/admin/v1/mappers');

/**
 *
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {object} logger Logging facility
 * @returns {Promise<{v1: function}>} Versioned middlewares
 */
module.exports = async ({tasks, logger}) => ({
  v1: await mw({
    logger,
    path: `${__dirname}/../../../api/admin/v1`,
    dependencies: {
      tasks,
      mappers,
    },
    securityHandlers: {},
  }),
});
