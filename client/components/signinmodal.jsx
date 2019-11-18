import React, { Component } from "react";

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.props.toggle} className={this.props.toggle ? "modalShow" : "modalNone"}>
        <div className="modalContainer">
          <div className="modalContent">
            random text inside
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
