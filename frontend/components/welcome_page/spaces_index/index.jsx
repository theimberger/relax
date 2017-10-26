import React from 'react';

class Index extends React.Component {

  constructor(props) {
    super();
    this.state = {
    };
    // this.handleSubmit.bind(this);
    // this.update.bind(this);
  }

  componentDidMount(){
    this.props.getSpaces();
  }

  render() {
    let spaces = Object.keys(this.props.spaces).map( (id) => (
      <li key={id}>
        {this.props.spaces[id].title}
      </li>
    ));
    return (
      <div>
        <h1>Start with a space</h1>
        <br/>
        <ul>
          {spaces}
        </ul>
      </div>
    );
  }
}

export default Index;
