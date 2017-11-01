import React from 'react';

class AddChannel extends React.Component {
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

          {/* <label>Make the channel private?</label>
          <input type="checkbox" className="slider"></input> */}
          <label>Name</label>
          <input placeholder="e.g. discussion"></input>
          <label>Purpose (optional)</label>
          <input placeholder="e.g. for talking about things"></input>
        </form>
      </div>
    );
  }

}

export default AddChannel;
