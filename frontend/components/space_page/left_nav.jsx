import React from 'react';
import { AddChannel, AddDirect } from "./add_channel_container";

class LeftNav extends React.Component {

  constructor() {
    super();
    this.state = {
      form: ""
    };
    this.openForm = this.openForm.bind(this);
  }

  openForm(type) {
    let form = document.getElementsByClassName(type);
    console.log(form);
    form = form[0];
    form.style.display = "flex";
    form.focus();
  }

  render() {
    let addChannel;
    if (this.props.space.userIsAdmin) {
      addChannel = <i className="fa fa-plus-circle"
        onClick={() => this.openForm("indirect")}
        aria-hidden="true"></i>;
    }

    let channels = this.props.space.channels.map((channel, idx) => {
      if (channel.is_direct === false) {
        let active = "";
        if (channel === this.props.activeChannel) {
          active = "active";
        }

        return (
          <li key={idx} className={active}>
            # {channel.title}
          </li>
        );
      }
    });

    let directs = this.props.space.channels.map((channel, idx) => {
      if (channel.is_direct) {
        let active = "";
        if (channel === this.props.activeChannel) {
          active = "active";
        }

        if (channel.title === this.props.user.username) {
          return (
            <li key={idx} className={active}>
                <span className="status_circle"></span>
                {channel.title}
                <span style={{color: "#777"}}> (you) </span>
              <i className="fa fa-times-circle" aria-hidden="true"
                onClick={() => this.openForm("addChannel")}></i>
            </li>
          );
        }

        return (
          <li key={idx} className={active}>
              <span className="status_circle"></span>
              {channel.title}
            <i className="fa fa-times-circle" aria-hidden="true"
              onClick={() => this.openForm("addChannel")}></i>
          </li>
        );
      }
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

        <h3>Channels {addChannel}</h3>
        <ul>
          {channels}
        </ul>

        <h3>
          Direct Messages
          <i className="fa fa-plus-circle" aria-hidden="true"
            onClick={() => this.openForm("direct")}></i>
        </h3>
        <ul>
          {directs}
        </ul>
        <AddChannel />
        <AddDirect />
      </div>
    );
  }
}
export default LeftNav;
