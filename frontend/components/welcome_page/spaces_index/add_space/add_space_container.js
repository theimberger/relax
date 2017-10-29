import { connect } from 'react-redux';
import AddSpace from './add_space';
import { postSpace, updateSpace } from '../../../../actions/spaces_actions';
import { createMembership } from '../../../../utils/membership_api_util';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  errors: state.errors.spaces
});

const mapDispatchToProps = dispatch => ({
  postSpace: (space) => dispatch(postSpace(space)),
  updateSpace: (space) => dispatch(updateSpace(space)),
  inviteMember: (id) => createMembership(id)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSpace);
