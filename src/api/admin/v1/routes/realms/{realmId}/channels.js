/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} The express-openapi router
 */
module.exports = (tasks, mappers) => ({
  async get(req, res) {
    const {offset, limit} = req.query;
    const {realmId} = req.params;

    const {ok, result: list, error} = await tasks.admin.listChannels({realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    return res.json(mappers.channelList(list));
  },

  async post(req, res) {
    const {id, properties, features} = req.body;
    const {realmId} = req.params;

    const {ok, result: channel, error} = await tasks.admin.createChannel({realmId, id, properties, features});

    if (!ok) {
      throw error;
    }

    return res.status(201).json(mappers.channel(channel));
  },
});
