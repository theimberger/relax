import React from 'react';
import { postMessage } from '../../../utils/message_util';
import { withRouter } from 'react-router-dom';

class MessageInput extends React.Component {

  constructor() {
    super();
    this.state = {
      input: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(e) {
    e.preventDefault();
    let message = {content: this.state.input};
    postMessage(this.props.match.params.id,
      this.props.match.params.channel_id,
      {message: message});
    document.getElementById('message_text_input').value = "";
    // let newState = this.state;
    // newState.input = "";
    this.setState({input: ""});
  }

  update(e) {
    e.preventDefault();
    let newState = this.state;
    newState.input = e.currentTarget.value;
    this.setState(newState);
  }


  render() {
    let channelTitle = this.props.channel.title;
    if (this.props.channel.is_direct
      && this.props.channel.title !== this.props.user.username) {
    channelTitle = this.props.channel.users.filter(
      (user) => user.id !== this.props.user.id );
      channelTitle = channelTitle[0].username;
    }

    if (!this.props.channel.is_direct) {
      channelTitle = `#${channelTitle}`;
    }
    channelTitle = "Message " + channelTitle;
    if (this.props.channel.title === this.props.user.username) {
      channelTitle = "Jot something down";
    }


    return (
      <div className="message_input">
        <div className="input_wrapper">
          <div className="plus">+</div>
          <form onSubmit={(e) => {
            this.sendMessage(e);}}>
            <input
              id="message_text_input"
              placeholder={channelTitle}
              autoComplete="off"
              onChange= {(e) => {
                this.update(e);
              }}/>
          </form>
          <div className="input_extras"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(MessageInput);
