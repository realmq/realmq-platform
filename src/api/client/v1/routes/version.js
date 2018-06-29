module.exports = openApiSpec => ({
  get: (req, res) => res.status(200).send({
    version: openApiSpec.info.version,
  }),
});
