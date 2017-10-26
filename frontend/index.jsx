import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { login, logout, signup } from './actions/session_actions';
import { requestUserSpaces, postSpace, requestSingleSpace } from './actions/spaces_actions';

document.addEventListener('DOMContentLoaded', () => {

  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
    let cuFetch = document.getElementById('cu_fetch');
    cuFetch.parentNode.removeChild(cuFetch);
  } else {
    store = configureStore();
  }

  //testing
  window.login = login;
  window.logout = logout;
  window.signup = signup;

  window.requestUserSpaces = requestUserSpaces;
  window.postSpace = postSpace;
  window.requestSingleSpace = requestSingleSpace;
  
  window.state = store.getState();
  window.dispatch = store.dispatch;
  //testing end


  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
