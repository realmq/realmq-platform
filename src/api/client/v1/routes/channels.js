
module.exports = (tasks, mapper) => ({
  /**
   * GET /channels
   * @param {object} req Request
   * @param {object} res Response
   */
  get: async (req, res) => {
    const {auth: authToken, user, query: {offset, limit}} = req;
    const {ok, value: list, error} =
      await tasks.client.listChannels({authToken, user, offset, limit});

    if (!ok) {
      throw error;
    }

    res.json(mapper.channelList(list));
  },
  /**
   * POST /channels
   * @param {object} req Request
   * @param {object} res Response
   */
  post: async (req, res) => {
    const {auth: authToken, body: data} = req;

    const {ok, value: list, error} =
      await tasks.client.createChannel({authToken, data});

    if (!ok) {
      throw error;
    }

    res.status(201).json(mapper.channel(list));
  },
});
