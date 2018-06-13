/**
 * Authenticated user controller
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Client tasks
 * @param {object} mappers Mappers
 * @returns {object} The authenticated user controller
 */
module.exports = (tasks, mappers) => ({
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
