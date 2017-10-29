import { connect } from 'react-redux';
import Index from './index';
import { login, logout, signup } from '../../../actions/session_actions';
import { requestUserSpaces } from '../../../actions/spaces_actions';

const mapStateToProps = state => (
  {
    currentUser: state.session.currentUser,
    spaces: state.entities.spaces,
    errors: state.errors.spaces
  }
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getSpaces: () => dispatch(requestUserSpaces())
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
