import React from 'react';

class WelcomeForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit.bind(this);
    this.update.bind(this);
  }

  update(field) {
    return (e) => {
      let newState = {[field]: e.currentTarget.value};
      this.setState(newState);
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.currentTarget.innerHTML === "Get Started") {
      this.props.signup(this.state);
    } else {
      this.props.login(this.state);
    }
  }

  render() {
    var errors;

    if (Array.isArray(this.props.errors)) {
      errors = <div className="errors">{this.props.errors.join(".  ")}</div>;
    }

    let form;
    if (this.props.currentUser) {
      form = <form className="session">
        <button>Go to Your Spaces</button>
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
        {form}
        {errors}

      </div>
    );
  }
}

export default WelcomeForm;
