import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createChart } from './charting';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <canvas id="canvas"></canvas>
        </div>
      </div>
    );
  }
  componentDidMount() {
    createChart();
  }
}

export default App;
