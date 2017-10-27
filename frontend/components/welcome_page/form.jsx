import React from 'react';
import { withRouter } from 'react-router';

class WelcomeForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
      username: "",
      password: ""
    };
    // this.handleSubmit.bind(this);
    // this.update.bind(this);
    this.navigateToSpaceIndex.bind(this);
  }

  update(field) {
    return (e) => {
      let newState = {[field]: e.currentTarget.value};
      this.setState(newState);
    };
  }

  navigateToSpaceIndex() {
    this.props.history.push('/my_spaces');
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.currentTarget.innerHTML === "Get Started") {
      this.props.signup(this.state).then(() => this.navigateToSpaceIndex());
    } else {
      this.props.login(this.state).then(() => this.navigateToSpaceIndex());
    }
  }

  render() {
    var errors;

    if (Array.isArray(this.props.errors)) {
      errors = <p className="errors">{this.props.errors.join(".  ")}</p>;
    }

    let form;
    if (this.props.currentUser) {
      form = <form className="session">
        <button onClick={ () => this.navigateToSpaceIndex() }>
          Go to Your Spaces
        </button>
        <button onClick={ () => this.props.logout() }>Logout</button>
      </form>;
    } else {
      form = <form className="session">
        <input
          type="text"
          onChange={this.update("username")}
          placeholder="Username"
        />

        <input
          type="password"
          onChange={this.update("password")}
          placeholder="Password"
        />
        <br />
        <br />
        <button onClick={ (e) => this.handleSubmit(e) }>Get Started</button>
        <button onClick={ (e) => this.handleSubmit(e) }>Log In</button>
      </form>;
    }

    return (
      <div>
        <h1>Where Breaks Happen</h1>
        <br/>
        <p>
          When your team needs to kick back, find a new hobby, deploy
          some brews, take some time, meet up, socialize, plan your next
          office party, and more, Relax has you covered.
        </p>
        <br/><br/>
        {form}
        {errors}

      </div>
    );
  }
}

export default withRouter(WelcomeForm);
