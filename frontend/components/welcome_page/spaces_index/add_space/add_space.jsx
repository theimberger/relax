import React from 'react';
import { withRouter } from 'react-router';
import Nav from '../nav';
import * as Steps from './steps';

class AddSpace extends React.Component {

  constructor(props) {
    super();
    this.state = {
      space: {},
      step: 1,
      title: "",
      description: "",
      invites: [""],
      warning: "",
      stepState: "listening"
    };

    this.update = this.update.bind(this);
  }

  navigateToSpaceShow() {
    this.props.history.push(`/spaces/${this.state.space.id}`);
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

        case 3:
          switch(e.type) {
            case "submit":
              if (newState.invites[newState.invites.length - 1] !== ""){
                newState.invites.push("");
              }
              this.setState(newState,
                () => {
                  let inputs = document.getElementsByTagName('input');
                  inputs[inputs.length - 1].focus();
                }
              );
              break;
            case "change":
              let idx = e.currentTarget.attributes.idx.value;
              newState.invites[idx] = e.currentTarget.value;
              break;
            case "click":

              newState.status = "pending";
              if (newState.invites.length === 1 && newState.invites[0] === "") {
                this.navigateToSpaceShow();
              }

              newState.invites.forEach((invite) => {
                if (invite !== ""){
                  this.props.inviteMember({membership:{
                    collection_id: newState.space.id,
                    collection_type: "Space",
                    username: invite
                  }}).then(
                    () => {
                      this.navigateToSpaceShow();
                    }
                  );
                }

              });
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
    let form;
    let errors;

    switch (this.state.step) {
      case 1:
        form = Steps.one(this.update, this.state.status, this.state.title);
        break;
      case 2:
        form = Steps.two(
          this.update,
          this.state.status,
          this.state.description
        );
        break;
      case 3:
        form = Steps.three(
          this.update,
          this.state.status,
          this.state.invites,
          this.state.space.title
        );
        break;
      default:
        break;
    }

    if (this.state.warning !== "") {
      errors = <div className="errors"
        style={{"fontSize": "2em", "textAlign": "center"}}>
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

export default withRouter(AddSpace);
