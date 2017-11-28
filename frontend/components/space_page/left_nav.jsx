import React from 'react';
import UserDropdown from './user_dropdown';
import { AddChannel, AddDirect } from "./add_channel_container";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

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
    form = form[0];
    form.style.display = "flex";
    form.focus();
  }

  toggleUserDropDown() {
    $('.user_dropdown').toggleClass("hidden");
  }

  render() {
    let addChannel;
    if (this.props.space.userIsAdmin) {
      addChannel = <i className="fa fa-plus-circle"
        onClick={() => this.openForm("indirect")}
        aria-hidden="true"></i>;
    }

    let allChannels = this.props.space.channels;
    allChannels.sort((a, b) => a.id > b.id);

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
          <Link key={idx}
            to={`/spaces/${this.props.space.id}/channels/${channel.id}`}>
            <li onClick={
              () => this.props.passChangeToParent({activeChannel: channel})}>
              # {channel.title}
            </li>
          </Link>
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
            <Link key={idx}
              to={`/spaces/${this.props.space.id}/channels/${channel.id}`}>
              <li className={active}
                onClick={() => this.props.passChangeToParent(
                  {activeChannel: channel})
                }>

                  <span className="status_circle"></span>
                  {channel.title}
                  <span style={{color: "#777"}}> (you) </span>
                <i className="fa fa-times-circle" aria-hidden="true"
                  onClick={() => this.props.deleteChannel(channel.id)}></i>
              </li>
            </Link>
          );
        }

        let title = channel.users.filter(
          (user) => user.id !== this.props.user.id );

        if (title[0] === undefined) {
          return;
        }

        title = title[0].username;

        return (
          <Link key={idx}
            to={`/spaces/${this.props.space.id}/channels/${channel.id}`}>
            <li className={active}
              onClick={() => this.props.passChangeToParent(
                {activeChannel: channel})
              }>
                <span className="status_circle"></span>
                {title}
              <i className="fa fa-times-circle" aria-hidden="true"
                onClick={() => this.props.deleteChannel(channel.id)}></i>
            </li>
          </Link>
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
        <AddChannel space={this.state.space} user={this.props.user}/>
        <AddDirect space={this.state.space} />
      </div>
    );
  }
}
export default withRouter(LeftNav);
