/**
 * Create express openapi auth token controller.
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Client tasks
 * @param {ClientApiV1Mappers} mappers Response mappers
 * @return {object} The express openapi controller
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /me/auth/token
   * @param {object} req Request
   * @param {object} res Response
   */
  async get(req, res) {
    res.json(mappers.auth(req.auth));
  },
});
