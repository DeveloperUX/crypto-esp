import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createChart, createRSIChart } from './charting';
import { createModel, train } from './magician.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <canvas id="canvas"></canvas>
        </div>
        <div>
          <canvas id="indicator-graph"></canvas>
        </div>
      </div>
    );
  }
  componentDidMount() {
    createChart();
    createRSIChart();
    train();
  }
}

export default App;
