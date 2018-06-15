/**
 * Channel message controller.
 *
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Client tasks
 * @param {object} mappers Mappers
 * @returns {object} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /channel/{id}/messages
   * @param {object} req Request
   * @param {object} res Response
   * @return {void}
   */
  async get(req, res) {
    const {auth: authToken, params: {id: channelId}} = req;

    const {ok, result: list, error} = await tasks.client.listMessages({authToken, channelId});
    if (!ok) {
      throw error;
    }

    res.json(mappers.messageList(list));
  },
});
