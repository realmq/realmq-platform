const mw = require('../../../lib/bootstrap/openapi-middleware');

module.exports = async ({tasks}) => ({
  v1: await mw({
    path: `${__dirname}/../../../api/admin/v1`,
    dependencies: {
      tasks
    }
  })
});
