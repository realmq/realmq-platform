const jsonPatch = require('fast-json-patch');
const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');
const ChannelModel = require('../../models/channel');

/**
 * Init patch channel task
 * @param {ChannelRepository} channelRepository Channel repository
 * @returns {Function} Task
 */
module.exports = ({channelRepository}) =>
  /**
   * @function ClientTasks#patchChannel
   * @param {AuthModel} authToken Authentication
   * @param {string} id Channel id
   * @param {object[]} patch Patch to apply
   * @returns {Result<ChannelModel>}
   */
  async ({authToken, id, patch}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(error(
        'InsufficientPrivileges',
        'Insufficient privileges to patch a channel.'
      ));
    }

    const channel = await channelRepository.findOne({realmId, id});
    if (!channel) {
      return failure(
        error(
          'UnknownChannel',
          'Channel does not exists.'
        )
      );
    }

    const patchValidationError = jsonPatch.validate(patch, channel);
    if (patchValidationError) {
      return failure(
        error(
          'InvalidPatch',
          'Provided patch is invalid.'
        ),
        patchValidationError
      );
    }

    const patchedChannel = jsonPatch.applyPatch(channel, patch);
    const {valid, errors: validationErrors} = ChannelModel.validate(patchedChannel);
    if (!valid) {
      return failure(
        error(
          'InvalidChannel',
          'Invalid channel after applying patch.'
        ),
        validationErrors
      );
    }

    const updatedChannel = channelRepository.update(patchedChannel);
    return success(updatedChannel);
  };
