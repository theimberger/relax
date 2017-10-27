import React from 'react';
import { withRouter } from 'react-router';

class Index extends React.Component {

  constructor(props) {
    super();
    this.state = {
    };
    this.navigateToAdd.bind(this);
    // this.update.bind(this);
  }

  componentDidMount(){
    this.props.getSpaces();
  }

  navigateToAdd() {
    this.props.history.push('/my_spaces/add');
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
        <ul className="si_form_links">
          <li>
            <span>
              <h3>Find your relaxing space</h3>
              <br/> Join or sign into an existing space
            </span>
            <img src={window.arrow} />

          </li>
          <li onClick={ () => this.navigateToAdd() }>
            <span>
              <h3>Create a new relaxing space</h3>
              <br/> Get your group on relax
            </span>
            <img src={window.arrow} />

          </li>
        </ul>

        <br/>
        {joinedSpaces}
        <ul className="spaces_list">
          {spaces}
        </ul>
      </div>
    );
  }
}

export default withRouter(Index);
