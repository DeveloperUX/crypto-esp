import * as tf from '@tensorflow/tfjs';

// Get data

// INPUT 
// OUPUT [0,1,0] BUY / SELL / HOLD

// Create Model
// Train Model
const createModel = async () => {
    // Define our model for Linear Regression
    const model = tf.sequential();
    const hiddentLayer = tf.layers.dense({
        units: 1,
        inputShape: [1]
    });
    const outputLayer = tf.layers.dense({
        units: 1
    });
    model.add(hiddentLayer);
    model.add(outputLayer);
    // prepare the model for training using
    // Mean Squared Error for our loss function and
    // Stochastic Gradient Descent as our optimizer
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });
}
// Predict something

createModel();

