import React from 'react';

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
    document.getElementsByClassName('right_nav')[0].style.display = "inline";
  };

  return (
    <header className="space_header">
      <section>
        <h4 id="channel_title">{channelTitle}</h4>
        <h5>users: {props.activeChannel.users.length}</h5>
      </section>
      <section>
        <i className="fa fa-cog" aria-hidden="true"></i>
        <i className="fa fa-info-circle" aria-hidden="true"
          onClick={showSidebar}></i>
      </section>
    </header>
  );
};

export default Header;
