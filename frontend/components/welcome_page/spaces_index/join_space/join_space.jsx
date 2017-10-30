import React from 'react';
import { connect } from 'react-redux';
import { destroyMembership } from '../../../../utils/membership_api_util';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class JoinSpace extends React.Component {
  render() {
    let spaces = Object.keys(this.props.spaces).map( (id) => {
      if (!this.props.spaces[id].is_pending) {
        return;
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

    let pendingSpaces;
    if (spaces.length === 1) {
      pendingSpaces = <p> You've been invited to this space</p>;
    } else if (spaces.length > 1) {
      pendingSpaces = <p> You've been invited to these spaces</p>;
    }

    return (
      <div>
        {pendingSpaces}
        <ul className="spaces_list">
          {spaces}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    spaces: state.entities.spaces,
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = dispatch => ({
  declineInvite: (id) => destroyMembership(id)
});

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(JoinSpace));
