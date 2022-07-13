/**
 * Realm controller
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @returns {{get: get}} The realm controller
 */
module.exports = (tasks, mappers) => ({
  get: async (req, res) => {
    const {params: {id}} = req;
    const {ok, result: realm, error} = await tasks.admin.fetchRealm({id});
    if (!ok) {
      throw error;
    }

    if (!realm) {
      return res.status(404).json({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      });
    }

    res.json(mappers.realm(realm));
  },
});
