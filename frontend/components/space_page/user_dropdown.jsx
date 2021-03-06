import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../actions/session_actions';

class UserDropdown extends React.Component {

  constructor() {
    super();
    this.logoutUser = this.logoutUser.bind(this);
  }

  navigateHome() {
    this.props.history.push('/');
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.navigateHome();
  }

  render() {
    let additionalOptions;
    if (this.props.spaces[this.props.match.params.id].userIsAdmin){
      additionalOptions = <li className="option"
        onClick={(e) => this.navigateHome()} >
        Invite members
      </li>;
    }

    return (
      <div className="user_dropdown hidden">
        <h4>{this.props.user.username}</h4>
        <ul className="options_list">
          {additionalOptions}
          <li className="option"
            onClick={(e) => this.navigateHome()} >
            Home
          </li>
          <li className="option"
            onClick={(e) => this.logoutUser(e)} >
            <span style={{"fontWeight": "700"}}>Logout</span>
          </li>
        </ul>
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
