import React from 'react';

class Messages extends React.Component {

  scrollDown() {
    let list = document.getElementsByClassName('message_list');
    list = list[0];
    list.scrollTop = list.scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate() {
    this.scrollDown();
  }

  render () {
    let messages = this.props.messages.map( (message) => (
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
  }
}

export default Messages;
