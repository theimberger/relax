import React from 'react';
import Nav from '../nav';
import * as Steps from './steps'
class AddSpace extends React.Component {

  constructor(props) {
    super();
    this.state = {
      space: {},
      step: 1,
      title: "",
      description: "",
      warning: "",
      stepState: "listening"
    };

    this.update = this.update.bind(this);
  }

  update(e) {
    e.preventDefault();
    let newState = this.state;
    newState.warning = "";
    newState.status = "listening";

    switch(this.state.step) {
      case 1:
        switch(e.type) {
          case "submit":
            if (newState.title === "") {
              newState.warning = "Please enter a title.";
            } else {
              newState.status = "pending";
              this.props.postSpace({space: {title: newState.title}}).then(
                (action) => {
                  newState.space = action.space;
                  newState.step += 1;
                  this.setState(newState);
                },
                () => {
                  newState.warning = "Sorry, that name has already been taken!";
                  newState.status = "failed";
                  this.setState(newState);
                });
            }
            break;
          case "change":
            newState.title = e.currentTarget.value;
            break;
          default:
            break;
          }
        break;

      case 2:
        switch(e.type) {
          case "submit":
            if (this.state.description === ""){
              newState.step += 1;
            } else {
              newState.space["description"] = newState.description;
              this.props.updateSpace({space: newState.space}).then(
                (action) => {
                  newState.space = action.space;
                  newState.step += 1;
                  this.setState(newState);
                },
                () => {
                  newState.warning = "Sorry, an error occured";
                  newState.status = "failed";
                  this.setState(newState);
                });
            }
            break;
          case "change":
            newState.description = e.currentTarget.value;
            break;
          default:
            break;
          }
          break;

        default:
          break;
    }
    this.setState(newState);
  }

  render() {
    console.log(this.state);
    let form;
    let errors;
    switch (this.state.step) {
      case 1:
        form = Steps.one(this.update, this.state.status, this.state.title);
        break;
      case 2:
        let buttonText = "Next";
        if (this.state.description === "") {
          buttonText = "Skip";
        }
        form = Steps.two(
          this.update,
          this.state.status,
          this.state.description,
          buttonText
        );
        break;
      default:
        break;
    }

    if (this.state.warning !== "") {
      errors = <div className="errors" style={{"fontSize": "2em", "textAlign": "center"}}>
        <br/>{this.state.warning}
      </div>;
    }

    return (
      <div className="add_space">
        <Nav />
        {form}
        {errors}
      </div>
    );
  }
}

export default AddSpace;
