/**
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} Realm token controller
 */
module.exports = (tasks, mappers) => ({
  get: async (req, res) => {
    const {account, query: {offset, limit}, params: {realmId}} = req;
    const {ok, result: list, error} =
      await tasks.admin.listRealmTokens({account, realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    res.json(mappers.authList(list));
  },

  post: async (req, res) => {
    const {account, params: {realmId}, body: {id, userId, scope, description}} = req;
    const {ok, result: realmToken, error} =
      await tasks.admin.createRealmToken({account, realmId, id, userId, scope, description});

    if (!ok) {
      throw error;
    }

    res.status(201).json(mappers.auth(realmToken));
  },
});
