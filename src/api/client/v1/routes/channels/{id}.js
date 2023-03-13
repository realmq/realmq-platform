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
   * @param {object} request Request
   * @param {object} response Response
   */
  async get(request, response) {
    const {auth: authToken, params: {id}} = request;

    const {ok, result: channel, error} = await tasks.client.fetchChannel({authToken, id});
    if (!ok) {
      throw error;
    }

    if (!channel) {
      return response.status(404).json({
        code: 'UnknownChannel',
        message: 'Channel does not exists.',
      });
    }

    response.json(mappers.channel(channel));
  },

  /**
   * PATCH /channel/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async patch(request, response) {
    const {auth: authToken, params: {id}, body: patch} = request;

    const {ok, result: channel, error} = await tasks.client.patchChannel({authToken, id, patch});
    if (!ok) {
      throw error;
    }

    response.json(mappers.channel(channel));
  },
  /**
   * DELETE /channel/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async delete(request, response) {
    const {auth: authToken, params: {id}} = request;

    const {ok, error} = await tasks.client.deleteChannel({authToken, id});
    if (!ok) {
      throw error;
    }

    response.status(204).send();
  },
});
