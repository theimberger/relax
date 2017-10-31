import { connect } from 'react-redux';
import * as ChannelForms from './add_channel';
import { createMembership } from '../../utils/membership_api_util';
import { createChannel } from '../../utils/channel_api_util';
import { withRouter } from 'react-router';

const mapStateToProps = (state, ownProps) => {
  return ({
    space: state.entities.spaces[ownProps.match.params.id],
    errors: state.errors.spaces
  });
};

const mapDispatchToProps = dispatch => ({
  inviteMember: (membership) => createMembership(membership),
  createChannel: (id, channel) => createChannel(id, channel)
});

export const AddChannel = withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ChannelForms.AddChannel));

export const AddDirect = withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ChannelForms.AddDirect));
