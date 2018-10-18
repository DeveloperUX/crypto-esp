


const getGraphFromData = (data) => {
    let prev = 1;
    const trxData = data.map(trx => {
        if (trx.weightedPrice > 99999999) {
            // number not present
            trx.weightedPrice = prev;
        } else {
            prev = trx.weightedPrice;
        }
        let point = {
            x: new Date(trx.time * 1000),
            y: trx.weightedPrice
        }
        return point;
    });
    return trxData;
}

const getPriceHistory = (rawData) => {
    // rawData = rawData.slice(rawData.length - 360, rawData.length);
    let lastGoodCandle = rawData[0];
    return rawData.map(rawCandle => {
        let candle = {};
        if (rawCandle[1] > 99999999) {
            candle = lastGoodCandle;
        } else {
            lastGoodCandle = rawCandle;
            candle = rawCandle;
        }
        return {
            time: candle[0],
            open: candle[1],
            high: candle[2],
            low: candle[3],
            close: candle[4],
            volumeInBTC: candle[5],
            volumeInUSD: candle[6],
            weightedPrice: candle[7],
        }
    })
}

const getWeightedPrices = (data) => {
    return Array.from(data, (candle) => candle.weightedPrice < 999999 ? candle.weightedPrice : 6000);
}

export {
    getGraphFromData,
    getPriceHistory,
    getWeightedPrices
}