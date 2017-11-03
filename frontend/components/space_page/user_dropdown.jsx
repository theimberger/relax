import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../actions/session_actions';

class UserDropdown extends React.Component {

  constructor() {
    super();
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="user_dropdown hidden">
        <h4>{this.props.user.username}</h4>
        <span className="logout"
          onClick={(e) => this.logoutUser(e)} >
          Logout
        </span>
      </div>
    );
  }
}


const mapStateToProps = state => (
  {
    user: state.session.currentUser,
    spaces: state.entities.spaces
  }
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps)(UserDropdown));
