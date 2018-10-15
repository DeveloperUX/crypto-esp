import * as ind from 'technicalindicators';

const getSMA = (prices, period = 21) => {
    const sma = ind.sma({
        period,
        values: prices
    });
    return sma;
}

/**
 * working..
 * @param {*} prices 
 * @param {*} period 
 */
const getRSI = (prices, period = 14) => {
    return ind.RSI.calculate({
        values: prices,
        period
    });
}

const getROC = (prices, period = 12) => {
    return ind.ROC.calculate({
        values: prices,
        period
    })
}

const getBB = (prices, period = 14, stddev = 2) => {
    return ind.BollingerBands.calculate({
        values: prices,
        period,
        stddev
    })
}

export {
    getSMA,
    getRSI,
    getROC,
    getBB
}