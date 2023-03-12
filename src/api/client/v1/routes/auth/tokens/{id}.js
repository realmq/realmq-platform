/**
 *
 * @param {{client: ClientTasks}} tasks Tasks
 * @param {ClientApiV1Mappers} mappers Mappers
 * @returns {{get: get, patch: patch, delete: delete}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /auth/tokens/{id}
   * @param {object} request Request
   * @param {object} response Response
   * @returns {Promise<void>} Nothing
   */
  async get(request, response) {
    const {auth: authToken, params: {id}} = request;
    const {ok, result: fetchedAuthToken, error}
      = await tasks.client.fetchAuth({authToken, id});

    if (!ok) {
      throw error;
    }

    if (!fetchedAuthToken) {
      return response.status(404).json({
        code: 'UnknownAuthToken',
        message: 'AuthToken does not exists.',
      });
    }

    response.json(mappers.auth(fetchedAuthToken));
  },

  /**
   * PATCH /auth/tokens/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async patch(request, response) {
    const {auth: authToken, params: {id}, body: patch} = request;

    const {ok, result: patchedAuthToken, error} = await tasks.client.patchAuth({authToken, id, patch});

    if (!ok) {
      throw error;
    }

    response.json(mappers.auth(patchedAuthToken));
  },

  /**
   * DELETE /auth/tokens/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async delete(request, response) {
    const {auth: authToken, params: {id}} = request;

    const {ok, error} = await tasks.client.deleteAuth({authToken, id});

    if (!ok) {
      throw error;
    }

    response.status(204).send();
  },
});
