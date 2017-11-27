import React from 'react';

class AddChannel extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      purpose: ""
    };

    this.update = this.update.bind(this);
  }

  closeForm() {
    let form = document.getElementsByClassName('indirect')[0];
    form.style.display = "none";
  }

  submitForm() {
    console.log('submitted');
    this.props.createChannel(this.props.space.id,
      {
        channel: {
          is_direct: false,
          title: this.state.title,
          purpose: this.state.purpose
        }
      });
    // this.updateFilter({currentTarget: {value: ""}});
    this.closeForm();
  }

  update(event, field) {
    let newState = this.state;
    newState[field] = event.currentTarget.value;
    this.setState(newState);
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
        <form onSubmit={() => this.submitForm()}>

          {/* <label>Make the channel private?</label>
          <input type="checkbox" className="slider"></input> */}
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
          <label>Send Invites To (optional):</label>
          <input placeholder="username" onChange={
            (e) => {
                this.update(e, "members");
              }
            } />
            <button>Add Channel</button>

        </form>
      </div>
    );
  }

}

export default AddChannel;
