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
        <span><h3>{this.props.spaces[id].title}</h3></span>
        <button>Launch</button>
      </li>
    ));

    let joinedSpaces;
    if (spaces.length === 1) {
      joinedSpaces = <p> You're already signed into this space</p>;
    } else if (spaces.length > 1) {
      joinedSpaces = <p> You're already signed into these spaces</p>;
    }

    return (
      <div>
        <h2>Start with a space</h2>

        <br/>
        {joinedSpaces}
        <ul className="spaces_list">
          {spaces}
        </ul>
      </div>
    );
  }
}

export default Index;
