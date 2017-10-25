import { connect } from 'react-redux';
import WelcomeForm from './form';
import { login, logout, signup } from '../../actions/session_actions';

const mapStateToProps = state => (
    { currentUser: state.session.currentUser }
);

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeForm);
