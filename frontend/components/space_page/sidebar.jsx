import React from 'react';

const Sidebar = (props) => {

  let channelTitle = props.channel.title;
  if (props.channel.is_direct) {
    channelTitle = "this conversation";
  }

  if (!props.channel.is_direct) {
    channelTitle = `#${channelTitle}`;
  }

  const hide = () => {
    document.getElementsByClassName('right_nav')[0].style.display = "none";
  };

  return (
    <ul className="right_nav">
      <li id="channel_info_header">
        <h4>About {channelTitle}</h4>
        <span className="channel_info_button"
          onClick={hide}>✕</span>
      </li>
      <li>
        <h4>Channel Details</h4>
        <span className="channel_info_button">▷</span>
        
      </li>
      <li>
        <h4>Members</h4>
        <span className="channel_info_button">▷</span>
      </li>
    </ul>
  );
};

export default Sidebar;
