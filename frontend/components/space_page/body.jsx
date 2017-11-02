import React from 'react';
import { Route } from 'react-router-dom';
import LeftNav from './left_nav';
import Header from './header';
import Messages from './messages';
import MessageInput from './message_input';
import Sidebar from './sidebar';

class Body extends React.Component {

  constructor() {
    super();
    this.state = {
      status: "pending"
    };

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    let newState = this.state;
    this.props.getSpace(this.props.match.params["id"]).then(
      (space) => {
        newState["status"] = "loaded";
        newState["space"] = space.space;
        newState["activeChannel"] = newState.space.channels[0];
        this.setState(newState);
      },
      (errors) => {
        newState["status"] = "failed";
        newState["warning"] = errors.errors.responseJSON;
        this.setState(newState);
      }
    );
  }

  update(data){
    let newState = Object.assign({}, this.state, data);
    this.setState(newState);
  }

  render() {
    if (this.state.status === "pending") {
      return (
        <h1>Loading...</h1>
      );
    }
    if (this.state.status === "failed") {
      return (
        <h1>{this.state.warning}</h1>
      );
    }
    return (
      <div className="show_main">

        <LeftNav
          activeChannel={this.state.activeChannel}
          space={this.state.space}
          user={this.props.user}
          passChangeToParent={this.update}
        />
        <Header activeChannel = {this.state.activeChannel}
          user= {this.props.user} />
        <div className="space_main">
          <div className="messages_wrapper">
            <Messages messages={this.state.activeChannel.messages}/>
            <MessageInput
              channel={this.state.activeChannel}
              user={this.props.user}
            />
          </div>
          <Sidebar />
        </div>

      </div>
    );
  }

}

export default Body;
