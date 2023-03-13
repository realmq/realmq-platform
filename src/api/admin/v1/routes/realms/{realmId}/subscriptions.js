/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} The express-openapi router
 */
module.exports = (tasks, mappers) => ({
  async get(request, response) {
    const {offset, limit} = request.query;
    const {realmId} = request.params;

    const {ok, result: list, error} = await tasks.admin.listSubscriptions({realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    return response.json(mappers.subscriptionList(list));
  },

  async post(request, response) {
    const {id, channelId, userId, allowRead, allowWrite} = request.body;
    const {realmId} = request.params;

    const {ok, result: subscription, error} = await tasks.admin.createSubscription({
      realmId,
      id,
      channelId,
      userId,
      allowRead,
      allowWrite,
    });

    if (!ok) {
      throw error;
    }

    return response.status(201).json(mappers.subscription(subscription));
  },
});
