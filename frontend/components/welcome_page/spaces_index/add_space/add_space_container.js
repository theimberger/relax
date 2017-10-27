import { connect } from 'react-redux';
import AddSpace from './add_space';
import { postSpace, updateSpace } from '../../../../actions/spaces_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  errors: state.errors.spaces
});

const mapDispatchToProps = dispatch => ({
  postSpace: (space) => dispatch(postSpace(space)),
  updateSpace: (space) => dispatch(updateSpace(space))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSpace);
