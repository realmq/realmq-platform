/**
 *
 * @param {BrokerTasks#markClientOffline} markClientOffline Task
 * @returns {Function} Handler
 */
module.exports = ({markClientOffline}) =>
  /**
   * @function BrokerV1VmqRoutes#onClientOffline
   * @param {object} request
   * @param {object} response
   * @returns {Promise<void>}
   */
  async (request, response) => {
    // This is a fire and forget request so respond immediately
    response
      .status(200)
      .json({});

    const {client_id: clientId} = request.body;
    if (!clientId) {
      return;
    }

    await markClientOffline(clientId);
  };
