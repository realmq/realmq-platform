/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @param {AdminApiV1Mappers} mappers Response mappers
 * @return {object} The express-openapi router
 */
module.exports = (tasks, mappers) => ({
  async get(req, res) {
    const {offset, limit} = req.query;
    const {ok, result: list, error} =
      await tasks.admin.listRealms({offset, limit});
    if (!ok) {
      throw error;
    }

    return res.json(mappers.realmList(list));
  },

  async post(req, res) {
    const {body: {name}} = req;
    const {ok, result: realm, error} = await tasks.admin.createRealm({name});

    if (!ok) {
      throw error;
    }

    return res.status(201).json(mappers.realm(realm));
  },
});
