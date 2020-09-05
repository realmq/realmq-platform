/**
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} Realm token controller
 */
module.exports = (tasks, mappers) => ({
  get: async (req, res) => {
    const {account, query: {offset, limit}, params: {realmId}} = req;
    const {ok, result: list, error} =
      await tasks.admin.listChannels({account, realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    res.json(mappers.channelList(list));
  },

  post: async (req, res) => {
    const {account, params: {realmId}, body: data} = req;
    const {ok, result: channel, error} =
      await tasks.admin.createChannel({...data, account, realmId});

    if (!ok) {
      throw error;
    }

    res.status(201).json(mappers.channel(channel));
  },
});
