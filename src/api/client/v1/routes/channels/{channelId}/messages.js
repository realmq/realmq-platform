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
   * GET /channel/{channelId}/messages
   * @param {object} req Request
   * @param {object} res Response
   * @return {void}
   */
  async get(req, res) {
    const {auth: authToken, params: {channelId}, query: {offset, limit, from, to}} = req;

    const sanitizedFrom = (from && new Date(from)) || undefined;
    const sanitizedTo = (from && new Date(to)) || undefined;

    const {ok, result: list, error} = await tasks.client.listMessages({
      authToken, channelId, offset, limit, from: sanitizedFrom, to: sanitizedTo,
    });

    if (!ok) {
      throw error;
    }

    res.json(mappers.messageList(list));
  },
});
