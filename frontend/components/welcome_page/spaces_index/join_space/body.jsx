import React from 'react';
import Nav from '../nav';
import JoinSpace from './join_space';

const Body = () => (
  <div className="page">
    <div className="grey_background"></div>
    <Nav />
    <div className="si_main">
      <JoinSpace />
    </div>
  </div>
);

export default Body;
