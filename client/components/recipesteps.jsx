import React, { Component } from "react";
import axios from "axios";

class RecipeSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canEdit: false,
      steps: []
    };

    this.edit = this.edit.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.submitDelete = this.submitDelete.bind(this);
    this.submitDeleteLastStep = this.submitDeleteLastStep.bind(this);
  }

  edit() {
    this.setState({
      canEdit: !this.state.canEdit,
      steps: this.props.steps
    });
  }

  submitEdit() {
    for (
      let i = 0;
      i < document.getElementsByClassName("recipe_step").length;
      i++
    ) {
      axios
        .put(`/recipes/${this.props.recipeId}/step/${i + 1}`, {
          description: document.getElementsByClassName("recipe_step")[i]
            .innerHTML
        })
        .then(results => {
          console.log(results);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  submitDelete() {
    axios
      .delete(`/recipes/${this.props.recipeId}`)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        window.location.reload();
      });
  }

  submitDeleteLastStep() {
    const amountSteps = this.props.steps.length;

    axios.delete(`/recipes/${this.props.recipeId}/step/${amountSteps}`)
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        let copySteps = this.state.steps;
        copySteps.pop();

        this.setState({
          steps: copySteps
        })
      })
  }
  // console.log(document.getElementsByClassName("recipe_step")[0].innerHTML);

  render() {
    return (
      <div className={!this.props.isToggled ? "modalNone" : "modalShow"}>
        <div className="modalContainer">
          <div className="modalContent">
            <button onClick={this.props.toggle} className="btn btn-secondary">
              Close
            </button>
            {this.props.currentRecipeUser === this.props.currentUser ? (
              <button onClick={this.edit} className="btn btn-secondary ml-3">
                Edit
              </button>
            ) : (
              ""
            )}
            <p>Created by {this.props.currentRecipeUser}</p>
            {this.props.steps.map(step => (
              <div>
                <p>{step.step_number + " "}</p>
                <p
                  className="recipe_step"
                  contentEditable={this.state.canEdit.toString()}
                >
                  {step.step_description}
                </p>
              </div>
            ))}
            {this.props.currentUser === this.props.currentRecipeUser ? (
              <div>
                <button
                  onClick={this.submitEdit}
                  className="btn btn-secondary mt-2"
                >
                  Submit changes
                </button>
                <button
                  onClick={this.submitDelete}
                  className="btn btn-secondary mt-2 ml-2"
                >
                  Delete Recipe
                </button>
                <button
                onClick={this.submitDeleteLastStep}
                className="btn btn-secondary mt-2 ml-2"
                >
                  Delete Last Step
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeSteps;
