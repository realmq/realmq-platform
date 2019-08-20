/**
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} Subscription controller
 */
module.exports = (tasks, mappers) => ({
  get: async (req, res) => {
    const {account, query: {offset, limit}, params: {realmId}} = req;
    const {ok, result: list, error} =
      await tasks.admin.listSubscriptions({account, realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    res.json(mappers.subscriptionList(list));
  },

  post: async (req, res) => {
    const {account, params: {realmId}, body: {id, userId, channelId, allowRead, allowWrite}} = req;
    const {ok, result: subscription, error} =
      await tasks.admin.createSubscription({account, realmId, id, userId, channelId, allowRead, allowWrite});

    if (!ok) {
      throw error;
    }

    res.status(201).json(mappers.subscription(subscription));
  },
});
