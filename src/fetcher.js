// require('@tensorflow/tfjs-node');

// 2D array of price movements
// [time, open, high, low, close, volume (BTC), volume (USD), weighted price]
const getData = async () => {
  // Get around the 'Access-Control-Allow-Origin' issue
  const config = {
    mode: 'no-cors'
  };
  const req = 'https://bitcoincharts.com/charts/chart.json?m=bitstampUSD&SubmitButton=Draw&i=Daily&t=W&m1=10&m2=25&i1=PPO&v=1&cv=0&ps=0&l=1&p=0';
  return fetch(req, config);
}

export { getData };
