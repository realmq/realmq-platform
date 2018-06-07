const initServer = require('./server');
const initMiddlewares = require('./middlewares');

module.exports = async ({tasks, logger}) => {
  const server = initServer({logger});
  const mws = await initMiddlewares({tasks, logger});

  server.use('/admin/v1', mws.admin.v1);
  server.use('/client/v1', mws.client.v1);
  server.use('/broker/v1', mws.broker.v1);
  server.use(mws.catchAll);
  server.use(mws.error);

  return server;
};
