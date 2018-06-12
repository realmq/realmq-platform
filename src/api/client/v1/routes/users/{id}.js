/**
 * User controller
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Client tasks
 * @param {object} mappers Mappers
 * @returns {object} The user controller
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /user/{id}
   * @param {object} req Request
   * @param {object} res Response
   * @return {void}
   */
  async get(req, res) {
    const {auth: authToken, params: {id}} = req;
    const {ok, result: user, error} = await tasks.client.fetchUser({authToken, id});

    if (!ok) {
      throw error;
    }

    if (!user) {
      return res.status(404).json({
        code: 'UnknownUser',
        message: 'User does not exists.',
      });
    }

    res.json(mappers.user(user));
  },
});
