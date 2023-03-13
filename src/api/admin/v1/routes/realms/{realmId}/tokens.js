/**
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} Realm token controller
 */
module.exports = (tasks, mappers) => ({
  async get(request, response) {
    const {query: {offset, limit}, params: {realmId}} = request;
    const {ok, result: list, error}
      = await tasks.admin.listRealmTokens({realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    response.json(mappers.authList(list));
  },

  async post(request, response) {
    const {params: {realmId}, body: {id, userId, scope, description}} = request;
    const {ok, result: realmToken, error}
      = await tasks.admin.createRealmToken({realmId, id, userId, scope, description});

    if (!ok) {
      throw error;
    }

    response.status(201).json(mappers.auth(realmToken));
  },
});
