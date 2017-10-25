import React from 'react';

class WelcomeForm extends React.Component {

  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    let form;
    if (this.props.loggedIn) {
      form = <form class="session">
        <button>Get Started</button>
      </form>;

    } else {
      form = <form class="session">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Get Started</button>
      </form>;
    }

    return (
      <div>
        <h1>Where Breaks Happen</h1>
        <br/>
        {form}
      </div>
    );
  }
}

export default WelcomeForm;
