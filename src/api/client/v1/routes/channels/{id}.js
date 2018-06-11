/**
 *
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Client tasks
 * @param {object} mappers Mappers
 * @returns {{get: get, patch: patch, delete: delete}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /channel/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  get: async (req, res) => {
    const {auth: authToken, params: {id}} = req;
    const {ok, result: channel, error} = await tasks.client.fetchChannel({authToken, id});

    if (!ok) {
      throw error;
    }

    if (!channel) {
      return res.status(404).json({
        code: 'UnknownChannel',
        message: 'Channel does not exists.',
      });
    }

    res.json(mappers.channel(channel));
  },

  /**
   * PATCH /channel/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  patch: async (req, res) => {
    const {auth: authToken, params: {id}, body: patch} = req;

    const {ok, result: channel, error} = await tasks.client.patchChannel({authToken, id, patch});

    if (!ok) {
      throw error;
    }

    res.json(mappers.channel(channel));
  },
  /**
   * DELETE /channel/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  delete: async (req, res) => {
    const {auth: authToken, params: {id}} = req;

    const {ok, error} = await tasks.client.deleteChannel({authToken, id});

    if (!ok) {
      throw error;
    }

    res.status(204).send();
  },
});
