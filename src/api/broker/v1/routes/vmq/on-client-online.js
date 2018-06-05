/**
 *
 * @param {BrokerTasks#markClientOnline} markClientOnline Task
 * @returns {Function} Handler
 */
module.exports = ({markClientOnline}) =>
  /**
   * @function BrokerV1VmqRoutes#onClientOnline
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

    await markClientOnline(clientId);
  };
