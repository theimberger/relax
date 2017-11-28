import React from 'react';

class AddChannel extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      purpose: "",
      invites: []
    };

    this.update = this.update.bind(this);
  }

  closeForm() {
    let form = document.getElementsByClassName('indirect')[0];
    form.style.display = "none";
  }

  submitForm() {
    this.props.createChannel(this.props.space.id,
      {
        channel: {
          is_direct: false,
          title: this.state.title,
          purpose: this.state.purpose
        }
      }).then((data) => {
        this.state.invites.forEach((invite) => {
          this.props.inviteMember({membership:{
            collection_id: data.id,
            collection_type: "Channel",
            username: invite
          }});
        });
      });

    this.closeForm();
  }

  update(event, field) {
    let newState = this.state;
    newState[field] = event.currentTarget.value;
    this.setState(newState);
  }

  addInvite(name){
    let newState = this.state;
    newState.invites.push(name);
    this.setState(newState);
  }

  removeInvite(name){
    let newState = this.state;
    newState.invites = newState.invites.filter((invite) => invite !== name);
    this.setState(newState);
  }

  render() {
    let members = this.props.space.users;
    members = members.map((member) => {
      if (member.username === this.props.user.username) {
        return "";
      }
      if (this.state.invites.includes(member.username)){
        return <li
          className="invite selected"
          onClick={() => this.removeInvite(member.username)}
          key={member.id}>
          {member.username}</li>;
      } else {
        return <li className="invite"
          onClick={() => this.addInvite(member.username)}
          key={member.id}>
          {member.username}</li>;
      }
    });

    members = members.filter((el) => el !== "");

    if (members.length > 0) {
      members = <div>
        <label style={{"fontSize": "1.6em"}}>Add To Channel (optional):</label>
        <ul className="invite_list">
          {members}
        </ul>
      </div>;
    }

    let button = <button>Create Channel</button>;
    if (this.state.title === ""){
      button = <button className="inactive">Create Channel</button>;
    }

    return (
      <div className="add_channel_form indirect"
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
        <h1>Create a channel</h1>
        <form onSubmit={() => this.submitForm()}>
          <label>Title</label>
          <input placeholder="e.g. discussion"
            onChange={
              (e) => {
                this.update(e, "title");
              }
            } />
          <label>Purpose (optional)</label>
          <input placeholder="e.g. for talking about things" onChange={
            (e) => {
                this.update(e, "purpose");
              }
            } />
          {button}
          {members}
        </form>
      </div>
    );
  }

}

export default AddChannel;
