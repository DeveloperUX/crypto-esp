import * as tf from '@tensorflow/tfjs';
import sampleData from './history-data.json';
import {
    getPriceHistory
} from './parsing';
import { getRSI } from './indicator-utils';
// require('@tensorflow/tfjs-node-gpu');

// Get data

// INPUT 
// OUPUT [0,1,0] BUY / SELL / HOLD
const normalize = (val, max, min) => { 
    return (val - min) / (max - min); 
}
// Create Model
const createModel = async () => {
    // Define our model for Linear Regression
    const model = tf.sequential();
    const inputLayer = tf.layers.dense({
        units: 1,
        inputShape: [1]
    });
    const hiddentLayer = tf.layers.dense({
        units: 1,
        inputShape: [1]
    });
    const outputLayer = tf.layers.dense({
        units: 1,
        inputShape: [1]
    });

    model.add(inputLayer);
    model.add(hiddentLayer);
    model.add(outputLayer);
    // prepare the model for training using
    // Mean Squared Error for our loss function and
    // Stochastic Gradient Descent as our optimizer
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });
    return model;
}
// Train Model
const train = async () => {
    const model = await createModel();
    let priceGraph = getPriceHistory(sampleData);
    // priceGraph = priceGraph.slice(100, 200)
    // get arrays of data
    let prices = Array.from(priceGraph, (candle) => normalize(candle.weightedPrice, 20000, 0));
    // let dates = Array.from(priceGraph, (candle) => candle.time);
    let rsiValues = getRSI(prices).map(p => normalize(p, 100, 0));
    // default RSI is over a 14 day period.. so first 14 days has no RSI
    rsiValues = [...Array(14).fill(0), ...rsiValues];
    // training date
    // prices = prices.slice(2000, 2100);
    // dates = dates.slice(2000, 2100);
    console.log('dates: ', rsiValues.length);
    console.log('prices: ', prices.length);
    const xs = tf.tensor1d(rsiValues);
    const ys = tf.tensor1d(prices);
    // actually train
    const x = await model.fit(xs, ys, {epochs: 100});
    console.log('done', x.history);
    const priceOnDate = rsiValues[rsiValues.length-1250];
    const priceOnDateTensor = tf.tensor2d([priceOnDate], [1,1]);
    const pred = await model.predict(priceOnDateTensor);
    console.log('pred: ', pred.dataSync()[0] * 20000);
}
// Predict something
const predict = async () => {

}


export {
    train,
    predict
}

