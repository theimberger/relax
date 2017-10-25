import React from 'react';
import { connect } from 'redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )}/>
);


const mapStateToProps = state => {
  let loggedIn = Boolean(state.session.currentUser);
  return (
    { loggedId: loggedIn }
  );
};


export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
