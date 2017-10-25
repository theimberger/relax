import React from 'react';
import Nav from './nav';
import Main from './main';

class Body extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    let form;
    if (this.props.loggedIn) {
      form = <h1>logged in</h1>;
    } else {
      form = <h1>logged out</h1>;
    }

    return (
      <div className="page">
        <Nav />
        <Main />
        {form}
      </div>
    );
  }
}

export default Body;
