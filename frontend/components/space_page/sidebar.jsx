import React from 'react';

const Sidebar = (props) => {

  let channelTitle = props.channel.title;
  if (props.channel.is_direct) {
    channelTitle = "this conversation";
  }

  if (!props.channel.is_direct) {
    channelTitle = `#${channelTitle}`;
  }
  return (
    <nav className="right-nav">
      <h4>About {channelTitle}</h4>
    </nav>
  );
};

export default Sidebar;
