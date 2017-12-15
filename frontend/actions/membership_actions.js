import * as ApiUtils from '../utils/membership_api_util';

export const CREATE_MEMBERSHIP = "CREATE_MEMBERSHIP";
export const DESTROY_MEMBERSHIP = "DESTROY_MEMBERSHIP";
export const RECEIVE_MEMBERSHIP_ERRORS = "RECEIVE_MEMBERSHIP_ERRORS";

const receiveMembership = (membership) => ({
  type: CREATE_MEMBERSHIP,
  membership
});

const removeMembership = (space) => ({
  type: DESTROY_MEMBERSHIP,
  space
});

const receiveMembershipErrors = (errors) => ({
  type: RECEIVE_MEMBERSHIP_ERRORS,
  errors
});


export const joinGroup = (membership) => dispatch => (
  ApiUtils.createMembership(membership).
    then(
    res => dispatch(receiveMembership(res)),
    err => dispatch(receiveMembershipErrors(err))
  )
);

export const leaveGroup = user => dispatch => (
  ApiUtils.login(user).then( (res) => dispatch(removeMembership(res)),
  err => dispatch(receiveMembershipErrors(err)))
);
