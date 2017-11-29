import React from 'react';
import Messages from './messages';
import MessageInput from './message_input';
import Header from './header';
import { connect } from 'react-redux';
import { requestSingleChannel } from '../../../actions/channel_actions';
import { withRouter } from 'react-router-dom';

class Body extends React.Component {
  constructor(){
    super();
    this.state = {
      channel: {},
      status: "pending"
    };
  }

  componentDidMount() {
    let newState = this.state;
    newState.channel = this.props;
    this.props.getChannel(this.props.match.params.channel_id).then(
      (channel) => {
        newState.channel = channel.channel;
        newState.status = "loaded";
        this.setState(newState);
    });
  }

  componentDidUpdate(newProps){
    let newState = this.state;
    if (newProps.match.params.channel_id !== this.props.match.params.channel_id) {
      newState.channel = this.props;
      this.props.getChannel(this.props.match.params.channel_id).then(
        (channel) => {
          newState.channel = channel.channel;
          newState.status = "loaded";
          this.setState(newState);
      });
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps !== this.props){
      let newState = this.state;
      newState.status = "pending";
      this.setState(newState);
    }
  }

  render() {
    if (this.state.status === "pending") {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <div className="messages_wrapper">
        <Messages messages={this.state.channel.messages}/>
        <MessageInput
          channel={this.state.channel}
          user={this.props.user}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => (
  {
    user: state.session.currentUser
  }
);

const mapDispatchToProps = dispatch => ({
  getChannel: (id) => dispatch(requestSingleChannel(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body));
