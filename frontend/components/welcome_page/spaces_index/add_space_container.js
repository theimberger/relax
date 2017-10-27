import { connect } from 'react-redux';
import AddSpace from './add_space';
import { postSpace } from '../../../actions/spaces_actions';

const mapStateToProps = state => ({currentUser: state.session.currentUser});

const mapDispatchToProps = dispatch => ({
  postSpace: (space) => dispatch(postSpace(space))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSpace);
