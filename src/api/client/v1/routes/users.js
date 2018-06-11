/**
 * Create /users express openapi controller.
 * @param {ClientTasks} tasks tasks
 * @param {ClientApiV1Mappers} mappers Response mappers
 * @return {object} The express openapi controller
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /users
   * @param {object} req Request
   * @param {object} res Response
   */
  get: async (req, res) => {
    const {auth: authToken, user, query: {offset, limit}} = req;
    const {ok, result: list, error} =
      await tasks.client.listUsers({authToken, user, offset, limit});

    if (!ok) {
      throw error;
    }

    res.json(mappers.userList(list));
  },
});
