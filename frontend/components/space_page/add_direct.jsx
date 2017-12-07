import React from 'react';

class AddDirect extends React.Component {
  constructor() {
    super();
    this.state = { filter: "" };
    this.updateFilter = this.updateFilter.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  closeForm() {
    let form = document.getElementsByClassName('direct')[0];
    form.style.display = "none";
  }

  updateFilter(e) {
    let newState = this.state;
    newState.filter = e.currentTarget.value;
    this.setState(newState);
  }

  submitForm(user) {
    let exists = false;
    let directs = this.props.space.channels.filter(
      (channel) => channel.is_direct);

    if (user.username === this.props.user.username){
      exists = directs.filter((channel, idx) => channel.title === user.username);
      if (exists.length > 0){
        exists = exists[0];
      } else {
        exists = false;
      }
    } else {

      directs.forEach((channel) => {

        let userIds = channel.users.map((channelUser) => channelUser.id);

        if (userIds.includes(user.id)){
          exists = channel;
        }

      });
    }
    if (exists){
      this.closeForm();
      this.setState({filter: ""});
      this.props.history.push(
        `/spaces/${this.props.space.id}/channels/${exists.id}`);
      this.props.updateActiveChannel(exists);
      return;
    }

    this.props.createChannel(this.props.space.id,
      {
        channel: {
          is_direct: true,
          user: user.id
        }
      }).then((data) => {
        this.closeForm();
        this.setState({filter: ""});
        this.props.updateActiveChannel(data.channel);
        this.props.history.push(
          `/spaces/${data.channel.space_id}/channels/${data.channel.id}`);
      });

  }

  render() {
    let users = [];
    let spaces = [];
    let button = <button className="inactive"
      onSubmit={ e => e.preventDefault() }>Go</button>;

    // this filters the user list to whatever has been searched,
    // because I goofed and styled the ding dang thing with flexbox
    // I have to account for removing elements by putting spacers in
    // TODO refactor CSS so I don't have to do this

    this.props.space.users.forEach((user) => {
      let name = user.username.slice(0, this.state.filter.length);
      let element;
      if (user.username === this.state.filter) {
        button = <button
          onClick={ () => this.submitForm(user) }>Go</button>;
      }
      if (name.toLowerCase() === this.state.filter.toLowerCase()){
        element = <li key={user.id}
          className="user"
          onClick = {(e) => {
            this.updateFilter({currentTarget: {value: user.username}});
          }}
          >
            {user.username}
          </li>;
        users.push(element);
      } else {
        element = <li key={user.id} className="spacer"></li>;
        spaces.push(element);
      }
    });

    return (
      <div className="add_channel_form direct"
        onKeyDown={
          (e) => {
            if (e.keyCode === 27) {
              this.closeForm();
            }
          }
        }
        tabIndex="0">
        <div className="close_form"
          onClick={ () => this.closeForm() }>
          <span>✕</span>
          <br/> esc
        </div>
        <h1>Direct Messages</h1>
        <form>
          <input
            placeholder="Find or start a conversation"
            value={this.state.filter}
            onChange={ e => {
              this.updateFilter(e);
            }}
          />
          {button}
        </form>
        <p>Recent conversations</p>
        <ul>
          {users}
          {spaces}
        </ul>
      </div>
    );
  }

}

export default AddDirect;
