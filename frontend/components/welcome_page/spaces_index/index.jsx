import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

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

  navigateToJoin() {
    this.props.history.push('/my_spaces/join');
  }

  render() {

    let pendingSpaces = Object.keys(this.props.spaces).map( (id) => {
      if (!this.props.spaces[id].is_pending) {
        return;
      }
      return id;
    });

    pendingSpaces = pendingSpaces.filter((el) => el !== undefined);

    if (pendingSpaces.length > 0) {
      pendingSpaces = <li onClick={ () => this.navigateToJoin() }>
          <span>
            <h3>Find your relaxing space</h3>
            <br/> Join an existing space you're invited to
          </span>
          <img src={window.arrow} />

        </li>;
    } else {
      pendingSpaces = "";
    }

    let spaces = Object.keys(this.props.spaces).map( (id) => {
      if (this.props.spaces[id].is_pending) {
        return null;
      }
      return (
        <li key={id}>
          <Link to={`/spaces/${id}`}>
            <span><h3>{this.props.spaces[id].title}</h3></span>
            <button>Launch</button>
          </Link>
        </li>
      );
    });

    spaces = spaces.filter((element) => {
      if (element === null) {
        return false;
      }
      return true;
    });


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
          {pendingSpaces}
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
