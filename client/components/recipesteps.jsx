import React, { Component } from "react";

class RecipeSteps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={!this.props.isToggled ? "modalNone" : "modalShow"}>
        <div className="modalContainer">
          <div className="modalContent">
            <button onClick={this.props.toggle} className="btn btn-secondary">Close</button>
            {this.props.steps.map(step => (
              <p>{step.step_number + " " + step.step_description}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeSteps;
