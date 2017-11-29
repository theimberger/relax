import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../actions/session_actions';

const ChannelOptions = (props) => {

  const toggleVis = () => {
    $('.channel_options').toggleClass("hidden");
  };
  let additionalOptions = [];
  if (props.channel.title !== "general"){
    additionalOptions.push(<li className="option" key="1">Leave Channel</li>);
  }
  return (
    <div className="channel_options hidden">
      <ul className="options_list">
        <li className="option">View channel details</li>
        {additionalOptions}
      </ul>
    </div>
  );
};

export default ChannelOptions;
//
// const mapStateToProps = state => (
//   {
//     user: state.session.currentUser,
//     spaces: state.entities.spaces
//   }
// );
//
// const mapDispatchToProps = dispatch => ({
//   logout: () => dispatch(logout())
// });
//
// export default withRouter(connect(
//   mapStateToProps, mapDispatchToProps)(ChannelOptions));
