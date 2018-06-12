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
   * @param {object} req Request
   * @param {object} res Response
   */
  async get(req, res) {
    const {auth: authToken, user, query: {offset, limit}} = req;
    const {ok, result: list, error} =
      await tasks.client.listUsers({authToken, user, offset, limit});

    if (!ok) {
      throw error;
    }

    res.json(mappers.userList(list));
  },

  /**
   * POST /users
   * @param {object} req Request
   * @param {object} res Response
   */
  async post(req, res) {
    const {auth: authToken, body: payload} = req;
    const {ok, result: user, error} =
      await tasks.client.createUser({authToken, data: payload});

    if (!ok) {
      throw error;
    }

    res.json(mappers.user(user));
  },
});
