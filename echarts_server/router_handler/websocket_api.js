const { Budget, Seller, Trend, Map, Rank, Hot, Stock  } = require('../db/index')

exports.getDataByChartName = function (chartName) {
    switch (chartName) {
        case 'budget':
            return Budget.find().then(result => {
                return result;
            });
        case 'hotproduct':
            return Hot.find().then(result => {
                return result;
            });
        case 'map':
            return Map.find().then(result => {
                return result;
            });
        case 'rank':
            return Rank.find().then(result => {
                return result;
            });
        case 'seller':
            return Seller.find().then(result => {
                return result;
            })
        case 'stock':
            return Stock.find().then(result => {
                return result;
            })
        case 'trend':
            return Trend.find().then(result => {
                return result;
            })
    }
}