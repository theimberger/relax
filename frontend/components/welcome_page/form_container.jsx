import { connect } from 'react-redux';
import WelcomeForm from './form';
import { login, logout, signup } from '../../actions/session_actions';

const mapStateToProps = state => (
    { currentUser: state.session.currentUser }
);

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, null)(WelcomeForm);
