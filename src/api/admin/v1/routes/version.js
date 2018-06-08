module.exports = () => ({
  get: (req, res) => res.status(200).send({
    version: '0.1.0',
  }),
});
