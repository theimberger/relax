import React from 'react';

export class AddChannel extends React.Component {

  render() {

    return (
      <div className="add_channel_form indirect"
        onKeyDown={
          (e) => {
            console.log(e);
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
        <form>

          <label>Make the channel private?</label>
          <input type="checkbox" className="slider"></input>

          <label>Name</label>
          <br/>
          <input placeholder="e.g. discussion"></input>

          <label>Purpose (optional)</label>
          <br/>
          <input placeholder="e.g. for talking about things"></input>
        </form>
      </div>
    );
  }

}

export class AddDirect extends React.Component {

  closeForm() {
    let form = document.getElementsByClassName('direct')[0];
    form.style.display = "none";
  }

  render() {
    let spaceUsers = this.props.space.users.map((user) => {
      return (
        <li key={user.id}>
          {user.username}
        </li>
      );
    });
    return (
      <div className="add_channel_form direct"
        onKeyDown={
          (e) => {
            console.log(e);
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
          <input placeholder="Find or start a conversation"></input>
        </form>
        <p>Recent conversations</p>
        <ul>
          {spaceUsers}
        </ul>
      </div>
    );
  }

}
