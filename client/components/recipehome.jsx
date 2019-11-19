import React, { Component } from "react";
import axios from "axios";

import RecipeSteps from "./recipesteps.jsx";
import InsertRecipeModal from './insertrecipemodal.jsx';

class RecipeHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      currentRecipeSteps: [],
      toggleStepsModal: false,
      currentRecipeUser: "",
      recipeId: null,
      recipeTitle: "",
      showInsert: false
    };

    this.getRecipeSteps = this.getRecipeSteps.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleInsert = this.toggleInsert.bind(this);
  }

  componentDidMount() {
    axios
      .get("/recipes")
      .then(res => {
        this.setState({
          recipes: res.data
        });
      })
      .catch(err => console.error(err));
  }

  toggle() {
    this.setState({
      toggleStepsModal: !this.state.toggleStepsModal
    });
  }

  getRecipeSteps(id, recipeTitle, currentUser) {
    axios
      .get(`/recipes/${id}/steps`)
      .then(results => {
        this.setState({
          currentRecipeSteps: results.data,
          currentRecipeUser: currentUser,
          recipeId: id,
          recipeTitle: recipeTitle
        });
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.toggle();
      });
  }

  toggleInsert() {
    this.setState({
      showInsert: !this.state.showInsert
    })
  }

  render() {
    return (
      <div className="container ">
        {this.state.recipes.map(recipe => (
          <div className="row  text-light">
            <h5
              onClick={() => {
                this.getRecipeSteps(recipe.id, recipe.title, recipe.user_name);
              }}
            >
              {recipe.title + " "}{" "}
            </h5>
            <p className="ml-2 mr-2"> by </p>
            <h5>{" " + recipe.user_name}</h5>
          </div>
        ))}
        {this.state.currentRecipeSteps !== [] ? (
          <RecipeSteps
            recipeTitle={this.state.recipeTitle}
            recipeId={this.state.recipeId}
            currentUser={this.props.currentUser}
            currentRecipeUser={this.state.currentRecipeUser}
            isToggled={this.state.toggleStepsModal}
            toggle={this.toggle}
            steps={this.state.currentRecipeSteps}
          />
        ) : (
          ""
        )}
        {this.props.isLoggedIn ? <button onClick={this.toggleInsert} className="btn btn-secondary">Create Recipe</button> : '' }
        {this.state.showInsert && this.props.isLoggedIn ? <InsertRecipeModal toggleInsert={this.toggleInsert}/> : ''}
      </div>
    );
  }
}

export default RecipeHome;
