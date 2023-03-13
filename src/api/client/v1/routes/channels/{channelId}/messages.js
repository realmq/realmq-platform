const {Buffer} = require('node:buffer');

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
   * @param {object} request Request
   * @param {object} response Response
   * @return {void}
   */
  async get(request, response) {
    const {auth: authToken, params: {channelId}, query: {offset, limit, from, to}} = request;

    const sanitizedFrom = (from && new Date(from)) || undefined;
    const sanitizedTo = (from && new Date(to)) || undefined;

    const {ok, result: list, error} = await tasks.client.listMessages({
      authToken, channelId, offset, limit, from: sanitizedFrom, to: sanitizedTo,
    });

    if (!ok) {
      throw error;
    }

    response.json(mappers.messageList(list));
  },

  /**
   * POST /channel/{channelId}/messages
   * @param {object} request Request
   * @param {object} response Response
   * @return {void}
   */
  async post(request, response) {
    const {auth: authToken, params: {channelId}, body: {content, encoding}} = request;

    const {ok, error} = await tasks.client.createMessage({
      authToken,
      channelId,
      content: Buffer.from(content, encoding),
    });

    if (!ok) {
      throw error;
    }

    response.status(204).send();
  },
});
