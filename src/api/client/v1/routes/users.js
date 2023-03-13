/**
 * Create /users express openapi controller.
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Client tasks
 * @param {ClientApiV1Mappers} mappers Response mappers
 * @return {object} The express openapi controller
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /users
   * @param {object} request Request
   * @param {object} response Response
   */
  async get(request, response) {
    const {auth: authToken, user, query: {offset, limit}} = request;
    const {ok, result: list, error}
      = await tasks.client.listUsers({authToken, user, offset, limit});

    if (!ok) {
      throw error;
    }

    response.json(mappers.userList(list));
  },

  /**
   * POST /users
   * @param {object} request Request
   * @param {object} response Response
   */
  async post(request, response) {
    const {auth: authToken, body: payload} = request;
    const {ok, result: user, error}
      = await tasks.client.createUser({authToken, data: payload});

    if (!ok) {
      throw error;
    }

    response.json(mappers.user(user));
  },
});
