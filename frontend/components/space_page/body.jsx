import React from 'react';
import { Route } from 'react-router-dom';
import LeftNav from './left_nav';
import Header from './header';
import Main from './main';

class Body extends React.Component {

  constructor() {
    super();
    this.state = {
      status: "pending"
    };
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
        />
        <Header activeChannel = {this.state.activeChannel} />
      </div>
    );
  }

}

export default Body;
