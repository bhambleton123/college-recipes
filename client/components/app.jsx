import React, { Component } from "react";
import axios from "axios";
import RecipeHome from "./recipehome.jsx";
import SignIn from './signinmodal.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPushed: false,
      isLoggedIn: false,
      token: "",
      currentUser: ""
    };

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!!window.localStorage.getItem("Authtoken") === false) {
      this.setState({
        isLoggedIn: false
      });
    } else {
      axios.defaults.headers.common[
        "Authorization"
      ] = window.localStorage.getItem("Authtoken");
      axios
        .get("/currentuser")
        .then(response => {
          this.setState({
            currentUser: response.data.name
          });
        })
        .catch(err => {
          console.error(err);
        });
      this.setState({
        isLoggedIn: true,
        token: window.localStorage.getItem("Authtoken")
      });
    }
  }

  toggle() {
    this.setState({
      isPushed: !this.state.isPushed
    });
  }

  logout() {
    window.localStorage.clear();

    window.location.reload();
  }

  render() {
    const logOut = (
      <button className="btn btn-primary ml-2" onClick={this.logout}>
        Log out
      </button>
    );
    return (
      <div className="bg-gradient-dark mt-3 ml-3 w-100">
        <div className="row">
          {this.state.isLoggedIn ? (
            <p className="text-light ml-2"> Logged in as: {this.state.currentUser}</p>
            ) : (
              ""
              )}
          {!this.state.isLoggedIn ? (
            <button className="btn btn-primary ml-3 mb-3" onClick={this.toggle}>
              Sign-in
            </button>
          ) : (
            logOut
            )}
        </div>
            <h5 id="main-title">COLLEGE RECIPES</h5>
        {this.state.isPushed ? <SignIn toggle={this.toggle}/> : ''}
        <div className="recipes">
          <RecipeHome isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser} />
        </div>
      </div>
    );
  }
}

export default App;
