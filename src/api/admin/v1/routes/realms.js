/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} The express-openapi router
 */
module.exports = (tasks, mappers) => ({
  async get(request, response) {
    const {offset, limit} = request.query;
    const {ok, result: list, error}
      = await tasks.admin.listRealms({offset, limit});
    if (!ok) {
      throw error;
    }

    return response.json(mappers.realmList(list));
  },

  async post(request, response) {
    const {body: {name, limits = {}}} = request;
    const {ok, result, error} = await tasks.admin.createRealm({name, limits});

    if (!ok) {
      throw error;
    }

    return response.status(201).json(mappers.realmDetails({
      realm: result.realm,
      realmLimits: result.realmLimits
    }));
  },
});
