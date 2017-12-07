import React from 'react';
import UserDropdown from './user_dropdown';
import { AddChannel, AddDirect } from "./add_channel_container";
import { withRouter } from 'react-router-dom';

class LeftNav extends React.Component {

  constructor() {
    super();
    this.state = {
      form: ""
    };
    this.openForm = this.openForm.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
    this.updateParent = this.updateParent.bind(this);
  }

  openForm(type) {
    let form = document.getElementsByClassName(type);
    form = form[0];
    form.style.display = "flex";
    form.focus();
  }

  toggleUserDropDown() {
    $('.user_dropdown').toggleClass("hidden");
  }

  deleteChannel(id, e) {
    e.preventDefault();
    this.props.deleteChannel(id);

    if (this.props.activeChannel.id === id) {
      let general = this.props.space.channels[0];
      this.props.passChangeToParent({activeChannel: general});
      this.props.history.
        push(`/spaces/${this.props.space.id}/channels/${general.id}`);
    } else {
      this.props.passChangeToParent({activeChannel: this.props.activeChannel});
    }
    return;
  }

  updateParent(channel, e){
    if (e.target.tagName !== "I"){
      this.props.passChangeToParent({activeChannel: channel});
      this.props.history.
        push(`/spaces/${this.props.space.id}/channels/${channel.id}`);
    }
  }

  render() {
    let addChannel;
    if (this.props.space.userIsAdmin) {
      addChannel = <i className="fa fa-plus-circle"
        onClick={() => this.openForm("indirect")}
        aria-hidden="true"></i>;
    }

    let allChannels = this.props.space.channels;
    allChannels.sort((a, b) => a.id - b.id);

    let channels = allChannels.map((channel, idx) => {
      if (channel.is_direct === false) {

        if (channel === this.props.activeChannel) {
          return (
            <li className="active" key={idx}>
              # {channel.title}
            </li>
          );
        }

        return (
          <li key={idx}
            onClick={(e) => this.updateParent(channel, e)}>
            # {channel.title}
          </li>
        );
      }
    });

    let directs = allChannels.map((channel, idx) => {
      if (channel.is_direct) {
        let active = "";
        if (channel === this.props.activeChannel) {
          active = "active";
        }

        if (channel.title === this.props.user.username) {
          return (
            <li className={active} key={idx}
              onClick={(e) => this.updateParent(channel, e)}>

                <span className="status_circle"></span>
                {channel.title}
                <span style={{color: "#777"}}> (you) </span>
              <i className="fa fa-times-circle" aria-hidden="true"
                onClick={(e) => this.deleteChannel(channel.id, e)}></i>
            </li>
          );
        }

        let title = channel.users.filter(
          (user) => user.id !== this.props.user.id );

        if (title[0] === undefined) {
          return;
        }

        title = title[0].username;

        return (
          <li className={active} key={idx}
            onClick={(e) => this.updateParent(channel, e)}>
              <span className="status_circle"></span>
              {title}
            <i className="fa fa-times-circle" aria-hidden="true"
              onClick={(e) => this.deleteChannel(channel.id, e)}></i>
          </li>
        );
      }
    }, this);

    return(
      <div className="space_left_nav">

        <nav className="left_nav_header"
          onClick={ () => this.toggleUserDropDown() }>
          <h4>{this.props.space.title}</h4>
          <h5>
            <span className="status_circle"></span>
            {this.props.user.username}
          </h5>
          <UserDropdown />
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
        <AddChannel
          space={this.state.space}
          user={this.props.user}

          updateActiveChannel={
            (data) => this.props.passChangeToParent({activeChannel: data})
          }/>

        <AddDirect
          space={this.state.space}
          user={this.props.user}
          updateActiveChannel={
            (data) => this.props.passChangeToParent({activeChannel: data})
          }/>

      </div>
    );
  }
}
export default withRouter(LeftNav);
