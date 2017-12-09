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

  if (props.channel.admin === props.user && !props.channel.is_direct){

    additionalOptions.push(
      <li key="invite" className="option">Add members</li>
    );

    if (props.channel.title !== "general") {
      additionalOptions.push(
        <li key="delete" className="option">Delete channel</li>
      );
    }

  }


  return (
    <div className="channel_options hidden">
      <ul className="options_list">
        {additionalOptions}
        <li className="option" onClick={showDetails}>
          View channel details
        </li>
      </ul>
    </div>
  );
};

export default withRouter(ChannelOptions);
