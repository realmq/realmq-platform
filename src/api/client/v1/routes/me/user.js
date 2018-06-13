/**
 * Authenticated user controller
 * @param {object} mappers Mappers
 * @returns {object} The authenticated user controller
 */
module.exports = mappers => ({
  /**
   * GET /me/user
   * @param {object} req Request
   * @param {object} res Response
   * @return {void}
   */
  async get(req, res) {
    res.json(mappers.user(req.user));
  },
});
