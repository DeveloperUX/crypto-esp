import { NeuralNetwork } from 'brain.js';
import _ from 'lodash';
import fin from 'technicalindicators';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

const getData = async () => {
  const req = 'https://bitcoincharts.com/charts/chart.json?m=bitstampUSD&SubmitButton=Draw&r=&i=Daily&c=0&s=&e=&Prev=&Next=&t=W&b=&a1=&m1=10&a2=&m2=25&x=0&i1=PPO&i2=&i3=&i4=&v=1&cv=0&ps=0&l=1&p=0&';
  return axios.get(req);
}


const data = [
  {
    input: [0,0,0],
    output: [0]
  },
  {
    input: [0,0,1],
    output: [0]
  },
  {
    input: [0,1,1],
    output: [0]
  },
  {
    input: [1,0,1],
    output: [1]
  },
  {
    input: [1,1,1],
    output: [1]
  },
];

const chart = await getData();
console.log(chart);

// const net = new NeuralNetwork();

// net.train(data);

// const res = net.run([1,0,0]);

// console.log('result: ', res);
