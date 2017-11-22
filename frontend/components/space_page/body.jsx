import React from 'react';
import LeftNav from './left_nav_container';
import Header from './header';
import ChannelPage from './channel_page/body';
import Sidebar from './sidebar';
import {
  Route,
  Link,
  HashRouter,
  Redirect
} from 'react-router-dom';

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
        this.props.history.push(
          `/spaces/${newState.space.id}/channels/${newState.activeChannel.id}`
        );
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
    let broadcasts = $('.broadcast');
    broadcasts.remove();
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
          <Route path="/spaces/:id/channels/:channel_id"
            component={ChannelPage} />
          <Sidebar channel={this.state.activeChannel}
            user= {this.props.user} />
        </div>

      </div>
    );
  }

}

export default Body;
