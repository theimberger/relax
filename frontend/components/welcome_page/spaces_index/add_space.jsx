import React from 'react';
import Nav from './nav';
class AddSpace extends React.Component {

  constructor(props) {
    super();

  }


  render() {

    return (
      <div className="add_space">
        <Nav />
        <form>
          <label>What's Your New Space Called?</label>
          <input placeholder="ex: my cool space"></input>
        </form>
      </div>
    );
  }
}

export default AddSpace;
