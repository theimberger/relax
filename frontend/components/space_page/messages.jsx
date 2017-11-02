import React from 'react';

const Messages = (props) => {
  let messages = props.messages.map( (message) => (
    <li key={message.id}>{message.content}</li>
  ));

  return (
    <ul className="message_list">
      {messages}
    </ul>
  );
};

export default Messages;
