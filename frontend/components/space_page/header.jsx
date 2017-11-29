import React from 'react';
import ChannelOptions from './channel_options'

const Header = (props) => {
  let channelTitle = props.activeChannel.title;
  if (props.activeChannel.is_direct
    && props.activeChannel.title !== props.user.username) {
    channelTitle = props.activeChannel.users.filter(
      (user) => user.id !== props.user.id );
    channelTitle = channelTitle[0].username;
  }

  if (!props.activeChannel.is_direct) {
    channelTitle = `#${channelTitle}`;
  }

  const showSidebar = () => {
    $('.right_nav').toggleClass("hidden");
  };

  const toggleChannelOptions = () => {
    $('.channel_options').toggleClass("hidden");
  };
  
  return (
    <header className="space_header">
      <section>
        <h4 id="channel_title">{channelTitle}</h4>
        <h5>users: {props.activeChannel.users.length}</h5>
      </section>
      <section>
        <i className="fa fa-cog" aria-hidden="true"
          onClick={toggleChannelOptions}></i>
        <i className="fa fa-info-circle" aria-hidden="true"
          onClick={showSidebar}></i>
      </section>
      <ChannelOptions channel={props.activeChannel} />
    </header>
  );
};

export default Header;
