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

  /**
   * DELETE /channel/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  async delete(req, res) {
    const {auth: authToken, params: {id}} = req;

    const {ok, error} = await tasks.client.deleteUser({authToken, id});

    if (!ok) {
      throw error;
    }

    res.status(204).send();
  },

  /**
   * PATCH /channel/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  async patch(req, res) {
    const {auth: authToken, params: {id}, body: patch} = req;

    const {ok, result: user, error} = await tasks.client.patchUser({authToken, id, patch});

    if (!ok) {
      throw error;
    }

    res.json(mappers.user(user));
  },
});
