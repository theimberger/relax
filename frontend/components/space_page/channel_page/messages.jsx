import React from 'react';

const Messages = (props) => {
  let messages = props.messages.map( (message) => (
    <li key={message.id}>
      <span className="message_author">{message.author}</span>
      <br />
      {message.content}
    </li>
  ));

  return (
    <ul className="message_list">
      {messages}
    </ul>
  );
};

export default Messages;
