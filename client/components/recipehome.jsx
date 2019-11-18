import React, { Component } from "react";
import axios from "axios";

class RecipeHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: []
    };
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

  render() {
    return (
      <div className="recipes">
        {this.state.recipes.map(recipe => (
          <h3>{recipe.title}</h3>
        ))}
      </div>
    );
  }
}

export default RecipeHome;
