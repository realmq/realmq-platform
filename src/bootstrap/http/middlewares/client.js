const mw = require('../../../lib/bootstrap/openapi-middleware');

module.exports = async ({tasks}) => ({
  v1: await mw({
    path: `${__dirname}/../../../api/client/v1`,
    dependencies: {
      tasks,
    },
  }),
});
