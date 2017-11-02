import {
  RECEIVE_SPACE_ERRORS,
  RECEIVE_SINGLE_SPACE,
  RECEIVE_USER_SPACES,
  CREATE_SPACE,
  UPDATE_SPACE
} from '../actions/spaces_actions';

import { RECEIVE_SINGLE_CHANNEL } from '../actions/channel_actions';

const spacesReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_USER_SPACES:
      let newState = Object.assign({}, state);
      action.spaces.forEach((space) => {
        newState[space.id] = space;
      });
      return newState;
    case RECEIVE_SINGLE_SPACE:
      newState = Object.assign({}, state);
      newState[action.space.id] = action.space;
      return newState;
    case RECEIVE_SINGLE_CHANNEL:
      newState = Object.assign({}, state);
      let channelId = action.channel.id;
      let spaceId = action.channel.space_id;
      let channels = newState[spaceId].channels.filter(function(channel) {
        return channel.id !== action.channel.id;
      });
      channels.push(action.channel);
      newState[spaceId].channels = channels;
      return newState;

    case CREATE_SPACE:
    case UPDATE_SPACE:
      newState = Object.assign({}, state);
      newState[action.space.id] = action.space;
      return newState;

    case RECEIVE_SPACE_ERRORS:
      return state;

    default:
      return state;
  }
};

export default spacesReducer;
