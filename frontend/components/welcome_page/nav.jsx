import React from 'react';
import NavList from './nav_list';

const Nav = () => (
  <nav className="welcome_nav">
    <a href="">
      <img className="logo" src={window.logo} />
    </a>
    <NavList />
  </nav>
);

export default Nav;
