const {Router: createRouter} = require('express');
const expressOpenApi = require('express-openapi');
const readYaml = require('../read-yaml');
const initErrorMiddleware = require('../express-openapi/error-middleware');

module.exports = async ({logger, path, dependencies, securityHandlers = {}}) => {
  const router = createRouter({});

  const root = path;
  const spec = await readYaml(`${root}/openapi.yaml`);
  const paths = `${root}/routes`;

  expressOpenApi.initialize({
    app: router,
    apiDoc: spec,
    dependencies: {
      ...dependencies,
      openApiSpec: spec,
    },
    docsPath: '/openapi.json',
    exposeApiDocs: true,
    paths,
    promiseMode: true,
    securityHandlers,
    errorMiddleware: initErrorMiddleware({logger}),
  });

  return router;
};
