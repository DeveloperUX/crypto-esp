
import Chart from 'chart.js';
import sampleData from './history-data.json';
import { getData } from './fetcher';
import {
    getGraphFromData,
    getParsedData,
    getPricesFromData
} from './parsing';
import { getRSI } from './indicator-utils';

const createChart = async() => {
    const rawData = await getData('daily');
    const parsedData = getParsedData(sampleData);
    const trxData = getGraphFromData(parsedData);

    var color = Chart.helpers.color;
    var scatterChartData = {
        datasets: [{
            label: 'Price Points',
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: color('rgb(75, 192, 192)').alpha(0.2).rgbString(),
            data: trxData
        }]
    };

    var ctx = document.getElementById('canvas').getContext('2d');
    Chart.defaults.global.elements.point.radius = 1;
    Chart.Scatter(ctx, {
        data: scatterChartData,
        options: {
            title: {
                display: true,
                text: 'Bitcoin Historical Price'
            },
            scales: {
                xAxes: [{
                    type: 'time'
                }],
				yAxes: [{
					type: 'logarithmic',
                    ticks: {
                        callback: function (value, index, values) {
                            //pass tick values as a string into Number function
                            const tick = Number(value.toString());
                            if (tick % 10 === 0) {
                                return tick;
                            }
                        }
                    },
                    afterBuildTicks: function(pckBarChart) {
                        pckBarChart.ticks = [];
                        pckBarChart.ticks.push(0);
                        pckBarChart.ticks.push(10);
                        pckBarChart.ticks.push(100);
                        pckBarChart.ticks.push(1000);
                        pckBarChart.ticks.push(10000);
                        pckBarChart.ticks.push(20000);
                    }
				}]
            }
        }
    });
};

const createRSIChart = () => {
    const parsedData = getParsedData(sampleData);
    const prices = getPricesFromData(parsedData);
    const smas = getRSI(prices);
    const graph = [];
    for (let i in parsedData) {
        graph.push({
            x: new Date(parsedData[i].time * 1000),
            y: smas[i]
        });
    }

    var color = Chart.helpers.color;
    var scatterChartData = {
        datasets: [{
            label: 'Price Points',
            pointRadius: 0, // no points
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: color('rgb(75, 192, 192)').alpha(0.2).rgbString(),
            fill: false,
            lineTension: 0, // don't round the edges
            data: graph
        }]
    };

    var ctx = document.getElementById('indicator-graph').getContext('2d');
    const chart = new Chart(ctx, {
        data: scatterChartData,
        type: 'line',
        options: {
            title: {
                display: true,
                text: 'Bitcoin Historical Price'
            },
            scales: {
                xAxes: [{
                    type: 'time'
                }],
				yAxes: [{
					type: 'logarithmic',
                    ticks: {
                        callback: function (value, index, values) {
                            //pass tick values as a string into Number function
                            const tick = Number(value.toString());
                            if (tick % 10 === 0) {
                                return tick;
                            }
                        }
                    },
                    afterBuildTicks: function(pckBarChart) {
                        pckBarChart.ticks = [];
                        pckBarChart.ticks.push(0);
                        pckBarChart.ticks.push(10);
                        pckBarChart.ticks.push(100);
                        pckBarChart.ticks.push(1000);
                        pckBarChart.ticks.push(10000);
                        pckBarChart.ticks.push(20000);
                    }
				}]
            }
        }
    });
}

export { 
    createChart,
    createRSIChart
};
