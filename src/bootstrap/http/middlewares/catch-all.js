module.exports = () =>
  (req, res) => res.status(404).json({
    code: 'EndpointNotFound',
    message: `${req.path} does not exist.`,
  });
