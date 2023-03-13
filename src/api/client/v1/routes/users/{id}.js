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
   * @param {object} request Request
   * @param {object} response Response
   * @return {void}
   */
  async get(request, response) {
    const {auth: authToken, params: {id}} = request;
    const {ok, result: user, error} = await tasks.client.fetchUser({authToken, id});

    if (!ok) {
      throw error;
    }

    if (!user) {
      return response.status(404).json({
        code: 'UnknownUser',
        message: 'User does not exists.',
      });
    }

    response.json(mappers.user(user));
  },

  /**
   * DELETE /channel/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async delete(request, response) {
    const {auth: authToken, params: {id}} = request;

    const {ok, error} = await tasks.client.deleteUser({authToken, id});

    if (!ok) {
      throw error;
    }

    response.status(204).send();
  },

  /**
   * PATCH /channel/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async patch(request, response) {
    const {auth: authToken, params: {id}, body: patch} = request;

    const {ok, result: user, error} = await tasks.client.patchUser({authToken, id, patch});

    if (!ok) {
      throw error;
    }

    response.json(mappers.user(user));
  },
});
