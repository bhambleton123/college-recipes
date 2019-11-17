import React, { Component } from 'react';
import Authform from './authform.jsx';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isPushed: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isPushed: !this.state.isPushed
    })
  }

  render(){
    return (
      <div>
        {this.state.isPushed ? <Authform/> : <button onClick={this.toggle}>Sign-in</button>}
      </div>
    )
  }
}

export default App;