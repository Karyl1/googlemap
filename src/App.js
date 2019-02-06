import React, {Component} from 'react';
import GoogleApiWrappe from './Map';
import './App.css';

class App extends Component {
  render(){
    return (
      <div>
      <GoogleApiWrappe />
        <h1>test</h1>
      </div>
    )
  }
}

export default App;