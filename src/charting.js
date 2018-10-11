
import Chart from 'chart.js';
import sampleData from './history-data.json';
import { getData } from './fetcher';

const getGraphFromData = (data) => {
    let prev = 1;
    const trxData = sampleData.map(trx => {
        if (trx[7] > 99999999) {
            // number not present
            trx[7] = prev;
        } else {
            prev = trx[7];
        }
        let point = {
            x: new Date(trx[0] * 1000),
            y: trx[7]
        }
        return point;
    });
    return trxData;
}


const createChart = async() => {
    const rawData = await getData('daily');
    const trxData = getGraphFromData(rawData);

    var color = Chart.helpers.color;
    // trxData = trxData.splice(0, 600);
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

export { createChart };
