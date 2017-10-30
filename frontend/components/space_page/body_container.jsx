import { connect } from 'react-redux';
import Body from './body';
import { login, logout, signup } from '../../actions/session_actions';
import { requestSingleSpace } from '../../actions/spaces_actions';

const mapStateToProps = state => ({currentUser: state.session.currentUser});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getSpace: (id) => dispatch(requestSingleSpace(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
