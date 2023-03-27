/**
 * @param {{admin: AdminTasks}} tasks Tasks
 * @returns {{delete: delete}} Method handlers
 */
module.exports = tasks => ({
  /**
   * DELETE /realms/{realmId}/channels/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async delete(request, response) {
    const {realmId, id} = request.params;

    const {ok, error} = await tasks.admin.deleteChannel({realmId, id});

    if (!ok) {
      throw error;
    }

    response.status(204).send();
  },
});
