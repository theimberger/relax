import React from 'react';

export class AddChannel extends React.Component {

  render() {

    return (
      <div className="add_channel_form">
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

  render() {
    return (
      <div className="add_channel_form">
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
