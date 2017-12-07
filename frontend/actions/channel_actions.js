import * as ApiUtils from '../utils/channel_api_util';


export const CREATE_CHANNEL = "CREATE_CHANNEL";
export const RECEIVE_SINGLE_CHANNEL = "RECEIVE_SINGLE_CHANNEL";
export const DELETE_CHANNEL = "DELETE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";

// const receiveSingleChannel = (channel) => ({
//   type: RECEIVE_SINGLE_CHANNEL,
//   channel
// });

// const createChannel = (channel) => ({
//   type: CREATE_CHANNEL,
//   channel
// });

const receiveSingleChannel = (channel) => ({
  type: RECEIVE_SINGLE_CHANNEL,
  channel
});

const receiveChannelErrors = (errors) => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

const destroyChannel = (channel) => ({
  type: DELETE_CHANNEL,
  channel
});

export const requestSingleChannel = (id) => dispatch => (
  ApiUtils.getChannel(id).then(
    res => dispatch(receiveSingleChannel(res)),
    err => dispatch(receiveChannelErrors(err))
  )
);

export const createChannel = (id, channel) => dispatch => (
  ApiUtils.createChannel(id, channel).then(
    res => dispatch(receiveSingleChannel(res)),
    err => dispatch(receiveChannelErrors(err))
  )
);

export const deleteChannel = (id) => dispatch => (
  ApiUtils.deleteChannel(id).then(
    res => dispatch(destroyChannel(res)),
    err => dispatch(receiveChannelErrors(err))
  )
);
