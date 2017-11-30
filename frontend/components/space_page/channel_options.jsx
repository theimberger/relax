import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { destroyMembership } from '../../utils/membership_api_util.js';

const ChannelOptions = (props) => {
  const toggleVis = () => {
    $('.channel_options').toggleClass("hidden");
  };
  let additionalOptions = [];
  if (props.channel.title !== "general"){
    additionalOptions.push(
      <li className="option" key="1"
        onClick={() => {
          toggleVis();
          destroyMembership(props.channel.id);
        }}>
        Leave Channel</li>
    );
  }

  const showDetails = () => {
    $('.right_nav').removeClass("hidden");
    toggleVis();
  };



  return (
    <div className="channel_options hidden">
      <ul className="options_list">
        <li className="option" onClick={showDetails}>
          View channel details
        </li>
        {additionalOptions}
      </ul>
    </div>
  );
};

export default withRouter(ChannelOptions);
