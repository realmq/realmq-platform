/**
 *
 * @param {{client: ClientTasks}} tasks Tasks
 * @param {ClientApiV1Mappers} mappers Mappers
 * @returns {{get: get, patch: patch, delete: delete}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /auth/tokens/{id}
   * @param {object} req Request
   * @param {object} res Response
   * @returns {Promise<void>} Nothing
   */
  get: async (req, res) => {
    const {auth: authToken, params: {id}} = req;
    const {ok, result: fetchedAuthToken, error} =
      await tasks.client.fetchAuth({authToken, id});

    if (!ok) {
      throw error;
    }

    if (!fetchedAuthToken) {
      return res.status(404).json({
        code: 'UnknownAuthToken',
        message: 'AuthToken does not exists.',
      });
    }

    res.json(mappers.auth(fetchedAuthToken));
  },

  /**
   * PATCH /auth/tokens/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  patch: async (req, res) => {
    const {auth: authToken, params: {id}, body: patch} = req;

    const {ok, result: patchedAuthToken, error} = await tasks.client.patchAuth({authToken, id, patch});

    if (!ok) {
      throw error;
    }

    res.json(mappers.auth(patchedAuthToken));
  },

  /**
   * DELETE /auth/tokens/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  delete: async (req, res) => {
    const {auth: authToken, params: {id}} = req;

    const {ok, error} = await tasks.client.deleteAuth({authToken, id});

    if (!ok) {
      throw error;
    }

    res.status(204).send();
  },
});
