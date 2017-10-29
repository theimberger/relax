import React from 'react';

class LeftNav extends React.Component {

  render() {
    return(
      <div className="space_left_nav">
        <h4>{this.props.title}</h4>
        <h3>Channels</h3>
        <h3>Direct Messages</h3>
      </div>
    );
  }
}

export default LeftNav;
