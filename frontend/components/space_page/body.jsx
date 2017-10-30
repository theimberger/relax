import React from 'react';
import { Route } from 'react-router-dom';
import LeftNav from './left_nav';
import Header from './header';
import Main from './main';

class Body extends React.Component {

  constructor() {
    super();
    this.state = { status: "pending" };
  }

  componentDidMount() {
    let newState = this.state;
    this.props.getSpace(this.props.match.params["id"]).then(
      (space) => {
        newState["status"] = "loaded";
        newState["space"] = space.space.space;
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
      <LeftNav title={this.state.space.title} />
    );
  }

}

//   const Body = (space) => (
//   <div className="space_page">
//     <LeftNav />
//     <Header />
//     <Main />
//   </div>
// );

export default Body;
