
module.exports = (tasks, mappers) => ({
  /**
   * GET /channels
   * @param {object} request Request
   * @param {object} response Response
   */
  async get(request, response) {
    const {auth: authToken, user, query: {offset, limit}} = request;
    const {ok, result: list, error}
      = await tasks.client.listChannels({authToken, user, offset, limit});

    if (!ok) {
      throw error;
    }

    response.json(mappers.channelList(list));
  },
  /**
   * POST /channels
   * @param {object} request Request
   * @param {object} response Response
   */
  async post(request, response) {
    const {auth: authToken, body: data} = request;

    const {ok, result: channel, error}
      = await tasks.client.createChannel({authToken, data});

    if (!ok) {
      throw error;
    }

    response.status(201).json(mappers.channel(channel));
  },
});
