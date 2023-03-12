/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} The express-openapi router
 */
module.exports = (tasks, mappers) => ({
  async get(req, res) {
    const {offset, limit} = req.query;
    const {realmId} = req.params;

    const {ok, result: list, error} = await tasks.admin.listSubscriptions({realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    return res.json(mappers.subscriptionList(list));
  },

  async post(req, res) {
    const {id, channelId, userId, allowRead, allowWrite} = req.body;
    const {realmId} = req.params;

    const {ok, result: subscription, error} = await tasks.admin.createSubscription({
      realmId,
      id,
      channelId,
      userId,
      allowRead,
      allowWrite
    });

    if (!ok) {
      throw error;
    }

    return res.status(201).json(mappers.subscription(subscription));
  },
});
