import React, { Component } from "react";
import axios from "axios";
import 'bootstrap';

class Authform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "signin",
      name: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  handleSubmit() {
    if (this.state.name !== "" && this.state.password !== "") {
      axios
        .post(`/${this.state.type}`, {
          name: this.state.name,
          password: this.state.password
        })
        .then(response =>
          typeof response.data === "string"
            ? window.localStorage.setItem(
                "Authtoken",
                "Bearer " + response.data
              )
            : console.log(response.data)
        )
        .catch(err => console.log(err))
        .finally(() => {
          window.location.reload();
        });
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const target = event.target.value;
    this.setState({
      [name]: target
    });
  }

  changeType() {
    if (this.state.type === "signin") {
      this.setState({
        type: "signup"
      });
    } else if (this.state.type === "signup") {
      this.setState({
        type: "signin"
      });
    }
  }

  render() {
    return (
      <div>
        <div className="column-container">
          <input
            name="name"
            placeholder="Username"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            className="form-control w-25"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="form-control w-25"
          />
          <button className="btn btn-primary mt-2" onClick={this.handleSubmit}>submit</button>
        </div>
        <button className="btn btn-secondary mt-2" onClick={this.changeType}>
          {this.state.type === "signin" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    );
  }
}

export default Authform;
