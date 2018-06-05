const initServer = require('./server');
const initMiddlewares = require('./middlewares');

module.exports = ({tasks, logger}) => {
  const server = initServer({logger});
  const mws = initMiddlewares({tasks});

  server.use('/broker', mws.broker);
  server.use(mws.catchAll);
  server.use(mws.error);

  return server;
};
