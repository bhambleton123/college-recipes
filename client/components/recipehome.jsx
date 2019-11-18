import React, { Component } from "react";
import axios from "axios";

import RecipeSteps from './recipesteps.jsx';

class RecipeHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      currentRecipeSteps: [],
      toggleStepsModal: false
    };

    this.getRecipeSteps = this.getRecipeSteps.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    axios
      .get('/recipes')
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
    })
  }

  getRecipeSteps(id) {
    axios.get(`/recipes/${id}/steps`)
      .then(results => {
        console.log(results);
        this.setState({
          currentRecipeSteps: results.data
        })
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.toggle();
      })
  }

  render() {
    return (
      <div className="container ">
        {this.state.recipes.map(recipe => (
          <div className="row  text-light">
            <h5 onClick={() => {this.getRecipeSteps(recipe.id)}}>{recipe.title + ' '} </h5>
            <p className="ml-2 mr-2"> by </p>
             <h5>{' ' + recipe.user_name}</h5>
          </div>
        ))}
        {this.state.currentRecipeSteps !== [] ? <RecipeSteps isToggled={this.state.toggleStepsModal} toggle={this.toggle} steps={this.state.currentRecipeSteps}/> : ''}
      </div>
    );
  }
}

export default RecipeHome;
