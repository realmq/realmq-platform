const {Router: createRouter} = require('express');
const expressOpenApi = require('express-openapi');
const readYaml = require('../read-yaml');

module.exports = async ({path, dependencies, securityHandlers = {}}) => {
  const router = createRouter({});

  const root = path;
  const spec = await readYaml(`${root}/openapi.yaml`);
  const paths = `${root}/routes`;

  expressOpenApi.initialize({
    app: router,
    apiDoc: spec,
    dependencies,
    docsPath: '/openapi.json',
    exposeApiDocs: true,
    paths,
    promiseMode: true,
    securityHandlers
  });

  return router;
};
