import React from 'react';

class LeftNav extends React.Component {

  render() {
    let channels = this.props.space.channels.map((channel, idx) => {
      return <li key={idx} ># {channel.title}</li>;
    });
    return(
      <div className="space_left_nav">
        <nav className="left_nav_header">
          <h4>{this.props.space.title}</h4>
          <h5>
            <span className="status_circle"></span>
            {this.props.user.username}
          </h5>
        </nav>
        <h3>Channels</h3>
        <ul>
          {channels}
        </ul>
        <h3>Direct Messages</h3>
        <ul>
        </ul>
      </div>
    );
  }
}
export default LeftNav;
