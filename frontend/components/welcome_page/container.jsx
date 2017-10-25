import { connect } from 'react-redux';
import Body from './body';
import { login, logout, signup } from '../../actions/session_actions';

const mapStateToProps = state => {
  let loggedIn = Boolean(state.session.currentUser);
  // debugger
  return (
    { loggedIn: loggedIn }
  );
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, null)(Body);
