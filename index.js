// import { NeuralNetwork } from 'brain.js';
const _ = require('lodash');
const fin = require('technicalindicators');
const tf = require('@tensorflow/tfjs');
const axios = require('axios');

require('@tensorflow/tfjs-node');

const getData = async () => {
  const req = 'https://bitcoincharts.com/charts/chart.json?m=bitstampUSD&SubmitButton=Draw&i=Daily&t=W&m1=10&m2=25&i1=PPO&v=1&cv=0&ps=0&l=1&p=0';
  return axios.get(req);
}

// 2D array of price movements
// [time, open, high, low, close, volume (BTC), volume (USD), weighted price]
const data = [];

const run = async () => {
  const res = await getData();
  console.log(res.data);
  data = res.data;
}

run();
