import { connect } from 'react-redux';
import AC from './add_channel';
import AD from './add_direct';
import { createMembership } from '../../utils/membership_api_util';
import { createChannel, requestSingleChannel } from '../../actions/channel_actions';

import { withRouter } from 'react-router';

const mapStateToProps = (state, ownProps) => {
  return ({
    space: state.entities.spaces[ownProps.match.params.id],
    errors: state.errors.spaces
  });
};

const mapDispatchToProps = dispatch => ({
  inviteMember: (membership) => createMembership(membership),
  createChannel: (id, channel) => dispatch(createChannel(id, channel)),
  fetchChannel: (id) => dispatch(requestSingleChannel(id))
});

export const AddChannel = withRouter(connect(mapStateToProps,
  mapDispatchToProps)(AC));

export const AddDirect = withRouter(connect(mapStateToProps,
  mapDispatchToProps)(AD));
