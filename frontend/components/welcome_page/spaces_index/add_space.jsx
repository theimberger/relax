import React from 'react';
import Nav from './nav';
class AddSpace extends React.Component {

  constructor(props) {
    super();
    this.state = {
      step: 1,
      title: "",
      description: "",
      warning: ""
    };

    this.changeStep.bind(this);
    this.update.bind(this);
  }

  changeStep(e) {
    e.preventDefault();
    let prev = this.state;
    if (this.state.step === 1 & this.state.title === "") {
      document.getElementsByTagName('input')[0].focus();
      prev.warning = "Please enter a space name.";
    } else {
      prev.step += 1;
    }

    if (prev.step > 2) {
      this.props.postSpace({space: {
        title: this.state.title,
        description: this.state.description}});
    }
    this.setState( prev );
  }

  update(e) {
    let newState = this.state;
    newState.warning = "";
    if (this.state.step === 1){
      newState.title = e.currentTarget.value;
    } else {
      newState.description = e.currentTarget.value;
    }

    this.setState(newState);
  }

  render() {
    let labelText;
    let input;
    let buttonText;
    let errors;

    if (this.state.step === 1){
      labelText = "What's your space called?";

      input = <input
        placeholder="ex. my cool space"
        onChange={(e) => this.update(e)}>
        </input>;

      if (this.state.title ==="") {
        input = <input value={this.state.title}
          onChange={(e) => this.update(e)}>
          </input>;
      }
      buttonText = "Next";
    } else {
      labelText = "Give your space a description (optional).";
      input = <textarea defaultValue={this.state.description}
        onChange={(e) => this.update(e)}>
        </textarea>;
      buttonText = "Submit";
      if (this.state.description === "") {
        buttonText = "No, just submit";
      }
    }

    if (this.state.errors !== "") {
      errors = <span className="errors" style={{fontSize: "2em"}}><br/>{this.state.warning}</span>;
    }
    
    return (
      <div className="add_space">
        <Nav />
        <form onSubmit={ (e) => this.changeStep(e) }>
          <label>{labelText}</label>
          {input}
          {errors}
          <button>{buttonText}</button>
        </form>
      </div>
    );
  }
}

export default AddSpace;
