/**
 * Authenticated user controller
 * @param {object} mappers Mappers
 * @returns {object} The authenticated user controller
 */
module.exports = mappers => ({
  /**
   * GET /me/user
   * @param {object} request Request
   * @param {object} response Response
   * @return {void}
   */
  async get(request, response) {
    response.json(mappers.user(request.user));
  },
});
