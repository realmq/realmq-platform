/**
 * Realm controller
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @returns {{get: get}} The realm controller
 */
module.exports = (tasks, mappers) => ({
  async get(request, response) {
    const {params: {id}} = request;
    const {ok, result, error} = await tasks.admin.fetchRealm({id});
    if (!ok) {
      throw error;
    }

    if (!result.realm) {
      return response.status(404).json({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      });
    }

    response.json(mappers.realmDetails({
      realm: result.realm,
      realmLimits: result.realmLimits,
    }));
  },
});
