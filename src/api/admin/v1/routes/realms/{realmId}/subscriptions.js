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
});
