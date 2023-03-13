module.exports = openApiSpec => ({
  get: (request, response) => response.status(200).send({
    version: openApiSpec.info.version,
  }),
});
