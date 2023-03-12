/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} The express-openapi router
 */
module.exports = (tasks, mappers) => ({
  async get(request, response) {
    const {offset, limit} = request.query;
    const {realmId} = request.params;

    const {ok, result: list, error} = await tasks.admin.listUsers({realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    return response.json(mappers.userList(list));
  },

  async post(request, response) {
    const {id, properties} = request.body;
    const {realmId} = request.params;

    const {ok, result: user, error} = await tasks.admin.createUser({realmId, id, properties});

    if (!ok) {
      throw error;
    }

    return response.status(201).json(mappers.user(user));
  },
});
