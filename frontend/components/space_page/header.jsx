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

  return (
    <header className="space_header">
      <section>
        <h4 id="channel_title">{channelTitle}</h4>
        <h5>Users</h5>
      </section>
      <section>
        <i class="fa fa-cog" aria-hidden="true"></i>
        <i class="fa fa-info-circle" aria-hidden="true"></i>
      </section>
    </header>
  );
};

export default Header;
