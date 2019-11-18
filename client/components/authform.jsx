import React, { Component } from 'react';
import axios from 'axios';
import './css/app.css';

class Authform extends Component {
  constructor(props){
    super(props);

    this.state = {
      type: 'signin',
      name: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  handleSubmit(){
    axios.post(`/${this.state.type}`, {name: this.state.name, password: this.state.password})
      .then(response => window.localStorage.setItem("Authtoken", "Bearer " + response.data))
      .catch(err => console.log(err));
  }

  handleChange(event){
    const name = event.target.name;
    const target = event.target.value;
    this.setState({
      [name]: target
    })
  }

  changeType() {
    if(this.state.type === 'signin'){
      this.setState({
        type: 'signup'
      });
    }
    else if(this.state.type === 'signup'){
      this.setState({
        type: 'signin'
      });
    }
  }

  render(){
    return (
      <div>
        <div className="column-container">
          <input name="name" placeholder="Username" type="text" value={this.state.name} onChange={this.handleChange}/>
          <input name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}>submit</button>
        </div>
        <button onClick={this.changeType}>{this.state.type === 'signin' ? 'Sign Up' : 'Sign In'}</button>
      </div>
    )
  }
}

export default Authform;