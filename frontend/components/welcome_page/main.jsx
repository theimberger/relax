import React from 'react';
import WelcomeForm from './form_container';

const Main = () => (
  <div className="welcome_main">
    <div>
      <img className="logo" src={window.welcomeImg} />
    </div>
    <WelcomeForm />
  </div>
);

export default Main;
