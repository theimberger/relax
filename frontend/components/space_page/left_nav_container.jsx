import React from 'react';
import { connect } from 'react-redux';
import LeftNav from './left_nav';
import { deleteChannel } from '../../utils/channel_api_util';

// const mapStateToProps = (state, ownProps) => {
//   return ({
//
//   });
// };

const mapDispatchToProps = dispatch => ({
  deleteChannel: (id) => deleteChannel(id)
});

export default connect(null,
  mapDispatchToProps)(LeftNav);
