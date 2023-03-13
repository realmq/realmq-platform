/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} The express-openapi router
 */
module.exports = (tasks, mappers) => ({
  async get(request, response) {
    const {offset, limit} = request.query;
    const {realmId} = request.params;

    const {ok, result: list, error} = await tasks.admin.listChannels({realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    return response.json(mappers.channelList(list));
  },

  async post(request, response) {
    const {id, properties, features} = request.body;
    const {realmId} = request.params;

    const {ok, result: channel, error} = await tasks.admin.createChannel({realmId, id, properties, features});

    if (!ok) {
      throw error;
    }

    return response.status(201).json(mappers.channel(channel));
  },
});
