import React, { Component } from 'react';
import Authform from './authform.jsx';
import axios from 'axios';

import RecipeHome from './recipehome.jsx';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isPushed: false,
      isLoggedIn: false,
      token: '',
      currentUser: ''
    }

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    if(!!window.localStorage.getItem('Authtoken') === false){
      this.setState({
        isLoggedIn: false
      });
    }
    else{
      axios.defaults.headers.common["Authorization"] = window.localStorage.getItem("Authtoken");
      axios.get('/currentuser')
        .then(response => {
          this.setState({
            currentUser: response.data.name
          })
        })
        .catch(err => {
          console.error(err);
        });
      this.setState({
        isLoggedIn: true,
        token: window.localStorage.getItem("Authtoken")
      })
    }
  }

  toggle() {
    this.setState({
      isPushed: !this.state.isPushed
    })
  }

  logout() {
    window.localStorage.clear();

    window.location.reload();
  }

  render(){
    const logOut = <button onClick={this.logout}>Log out</button>;
    return (
      <div>
        {this.state.isLoggedIn ? this.state.currentUser + " " : ''}
        {!this.state.isLoggedIn ? <button onClick={this.toggle}>Sign-in</button> : logOut}
        {this.state.isPushed ? <Authform/> : ''}
        <div className="recipes">
          <RecipeHome/>
        </div>
      </div>
    )
  }
}

export default App;