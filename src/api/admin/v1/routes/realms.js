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
    const {body: {name}} = request;
    const {ok, result: realm, error} = await tasks.admin.createRealm({name});

    if (!ok) {
      throw error;
    }

    return response.status(201).json(mappers.realm(realm));
  },
});
