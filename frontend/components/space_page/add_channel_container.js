import { connect } from 'react-redux';
import * as ChannelForms from './add_channel_form';
import { createMembership } from '../../../../utils/membership_api_util';

const mapStateToProps = (state, ownProps) => ({
  users: state.enitities.spaces[ownProps.match.params.id].users,
  errors: state.errors.spaces
});

const mapDispatchToProps = dispatch => ({
  inviteMember: (id) => createMembership(id)
});

export const AddChannel = connect(mapStateToProps,
  mapDispatchToProps)(ChannelForms.AddChannel);

export const AddDirect = connect(mapStateToProps,
  mapDispatchToProps)(ChannelForms.AddDirect);
