module.exports = () =>
  (req, res) => res.status(404).json({
    code: 'ENDPOINT_NOT_FOUND',
    message: `${req.path} does not exist.`,
  });
