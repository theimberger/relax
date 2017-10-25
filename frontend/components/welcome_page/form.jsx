import React from 'react';

class WelcomeForm extends React.Component {

  constructor(props) {
    super();
    this.state = {

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

  handleSubmit() {
    debugger
    this.props.login(this.state);
  }

  render() {
    let form;
    if (this.props.currentUser) {
      form = <form className="session">
        <button>Get Started</button>
      </form>;
    } else {
      form = <form className="session" onSubmit={ () => this.handleSubmit() }>
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

        <button>Get Started</button>
      </form>;
    }

    return (
      <div>
        <h1>Where Breaks Happen</h1>
        <br/>
        {form}
        {console.log(this.props)}
        {console.log(this.state)}
      </div>
    );
  }
}

export default WelcomeForm;
