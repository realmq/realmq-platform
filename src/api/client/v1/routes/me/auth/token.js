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
   * @param {object} request Request
   * @param {object} response Response
   */
  async get(request, response) {
    response.json(mappers.auth(request.auth));
  },
});
