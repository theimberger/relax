import React from 'react';
import { connect } from 'react-redux';
import LeftNav from './left_nav';
import { deleteChannel } from '../../actions/channel_actions';

// const mapStateToProps = (state, ownProps) => {
//   return ({
//
//   });
// };

const mapDispatchToProps = dispatch => ({
  deleteChannel: (id) => dispatch(deleteChannel(id))
});

export default connect(null,
  mapDispatchToProps)(LeftNav);
