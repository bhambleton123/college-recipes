import React, { Component } from "react";
import axios from "axios";

import PostStepForm from "./poststepform.jsx";

class RecipeSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canEdit: false,
      steps: [],
      toggleForm: false,
      description: ""
    };

    this.edit = this.edit.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.submitDelete = this.submitDelete.bind(this);
    this.submitDeleteLastStep = this.submitDeleteLastStep.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitStep = this.submitStep.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        steps: this.props.steps
      },
      () => {
        console.log(this.state.steps);
      }
    );
  }

  edit() {
    this.setState({
      canEdit: !this.state.canEdit,
      steps: this.props.steps
    });
  }

  submitStep(description) {
    const nextStep = this.props.steps.length + 1;
    axios.post(`/recipes/${this.props.recipeId}/step/${nextStep}`, {
      description: description
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(console.log(nextStep, this.props.recipeId));
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

    axios
      .delete(`/recipes/${this.props.recipeId}/step/${amountSteps}`)
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
        });
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const target = event.target.value;
    this.setState({
      [name]: target
    });
  }
  // console.log(document.getElementsByClassName("recipe_step")[0].innerHTML);
  toggleForm() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

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
            <p>
              {this.props.recipeTitle} Created by {this.props.currentRecipeUser}
            </p>
            {this.props.steps.map(step => (
              <div>
                <p>
                  <u>{"Step: " + step.step_number + " "}</u>
                </p>
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
                {this.state.canEdit ? (
                  <button
                    onClick={this.submitEdit}
                    className="btn btn-secondary mt-2"
                  >
                    Submit changes
                  </button>
                ) : (
                  ""
                )}
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
                <button
                  onClick={this.toggleForm}
                  className="btn btn-secondary mt-2 ml-2"
                >
                  Add Step
                </button>
                {this.state.toggle ? (
                  <PostStepForm
                    handleChange={this.handleChange}
                    description={this.state.description}
                    submitStep={this.submitStep}
                  />
                ) : (
                  ""
                )}
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
