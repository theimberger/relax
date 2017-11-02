import React from 'react';

const MessageInput = (props) => {

  let channelTitle = props.channel.title;
  if (props.channel.is_direct
    && props.channel.title !== props.user.username) {
    channelTitle = props.channel.users.filter(
      (user) => user.id !== props.user.id );
    channelTitle = channelTitle[0].username;
  }

  if (!props.channel.is_direct) {
    channelTitle = `# ${channelTitle}`;
  }

  return (
    <div className="message_input">
      <div className="input_wrapper">
        <div className="plus">+</div>
          <form>
            <input
              placeholder={`Message ${channelTitle}`}
              data-behavior="chat_speaker" />
          </form>
        <div className="input_extras"></div>
      </div>
    </div>
  );
};

export default MessageInput;
