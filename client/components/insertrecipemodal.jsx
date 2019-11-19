import React, { Component } from "react";
import axios from "axios";

class InsertRecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };

    this.postRecipe = this.postRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const target = event.target.value;
    this.setState({
      [name]: target
    });
  }

  postRecipe() {
    axios
      .post("/recipes", {
        title: this.state.title
      })
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        window.location.reload();
      })
  }

  render() {
    return (
      <div className={this.props.toggleInsert ? "modalShow" : "modalNone"}>
        <div className="modalContainer">
          <div className="modalContent">
          <button onClick={this.props.toggleInsert} className="btn btn-secondary close-modal">Close</button>
            <input
              name="title"
              placeholder="Recipe Title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
              className="form-control w-75 mb-2 mt-2"
            />
            <button onClick={this.postRecipe} className="btn btn-secondary">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default InsertRecipeModal;
