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
          <li key={idx}
            className={active}
            onClick={() => this.props.passChangeToParent({activeChannel: channel})
            }>
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
            <li key={idx}
              className={active}
              onClick={() => this.props.passChangeToParent(
                {activeChannel: channel})
              }>

                <span className="status_circle"></span>
                {channel.title}
                <span style={{color: "#777"}}> (you) </span>
              <i className="fa fa-times-circle" aria-hidden="true"
                onClick={() => this.openForm("addChannel")}></i>
            </li>
          );
        }

        let title = channel.users.filter(
          (user) => user.id !== this.props.user.id );

        title = title[0].username;

        return (
          <li key={idx} className={active}
            onClick={() => this.props.passChangeToParent(
              {activeChannel: channel})
            }>
              <span className="status_circle"></span>
              {title}
            <i className="fa fa-times-circle" aria-hidden="true"
              onClick={() => this.openForm("addChannel")}></i>
          </li>
        );
      }
    }, this);

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
        <ul className="channel_list">
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
        <AddChannel space={this.state.space} />
        <AddDirect space={this.state.space} />
      </div>
    );
  }
}
export default LeftNav;
