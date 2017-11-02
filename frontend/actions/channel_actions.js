import * as ApiUtils from '../utils/channel_api_util';

export const RECEIVE_SINGLE_CHANNEL = "RECEIVE_SINGLE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";

const receiveSingleChannel = (channel) => ({
  type: RECEIVE_SINGLE_CHANNEL,
  channel
});

const receiveChannelErrors = (errors) => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

export const requestSingleChannel = (id) => dispatch => (
  ApiUtils.getChannel(id).then(
    res => dispatch(receiveSingleChannel(res)),
    err => dispatch(receiveChannelErrors(err))
  )
);
