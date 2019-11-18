import React, { Component } from "react";
import axios from "axios";

class RecipeHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: []
    };

    this.getRecipeSteps = this.getRecipeSteps.bind(this);
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

  getRecipeSteps() {

  }

  render() {
    return (
      <div className="container ">
        {this.state.recipes.map(recipe => (
          <div className="row  text-light">
            <h5>{recipe.title + ' '} </h5>
            <p className="ml-2 mr-2"> by </p>
             <h5>{' ' + recipe.user_name}</h5>
          </div>
        ))}
      </div>
    );
  }
}

export default RecipeHome;
