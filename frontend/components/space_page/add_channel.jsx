import React from 'react';

export class AddChannel extends React.Component {
  closeForm() {

    let form = document.getElementsByClassName('indirect')[0];
    form.style.display = "none";
  }

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
    console.log('submitted');
    this.props.createChannel(this.props.space.id,
      {
        channel: {
          is_direct: true,
          user: user.id
        }
      });
    // this.updateFilter({currentTarget: {value: ""}});
    // this.closeForm();
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
