import React, { Component } from 'react';
import './App.css';

import api from './Api';
import Routes from './Routes';

class App extends Component {
  state = {
    sintomas: [],
  }

  async componentDidMount() {
    const response = await api.get('sintomas');

    this.setState({ filmes: response.data });
  }
  render() {

    return (
      <div>
        <Routes />
      </div>
    );
  }
}



export default App;



