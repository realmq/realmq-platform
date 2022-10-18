/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} The express-openapi router
 */
module.exports = (tasks, mappers) => ({
  async get(req, res) {
    const {offset, limit} = req.query;
    const {realmId} = req.params;

    const {ok, result: list, error} = await tasks.admin.listUsers({realmId, offset, limit});

    if (!ok) {
      throw error;
    }

    return res.json(mappers.userList(list));
  },

  async post(req, res) {
    const {id, properties} = req.body;
    const {realmId} = req.params;

    const {ok, result: user, error} = await tasks.admin.createUser({realmId, id, properties});

    if (!ok) {
      throw error;
    }

    return res.status(201).json(mappers.user(user));
  },
});
