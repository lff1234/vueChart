const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/echarts_server')
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败', err))


// 创建集合规则
const budgetSchema = new mongoose.Schema({
    dimName: String,
    dimZhName: String,
    max: Number,
    budget: Number,
    expense: Number
})

const Budget = mongoose.model('Budget', budgetSchema,'budget');


const sellerSchema = new mongoose.Schema({
    name: String,
    value: Number
})

const Seller = mongoose.model('Seller', sellerSchema,'seller');


const trendSchema = new mongoose.Schema({
    title: String,
    base: Number,
    unit: String,
    data: [
        {
            name: String,
            data: [String]
        }
    ],
	type:String
})

const Trend = mongoose.model('Trend', trendSchema,'trend')


const mapSchema = new mongoose.Schema({
    name: String,
    children: [
        {
            name: String,
            value: [Number]
        }
    ]
})

const Map = mongoose.model('Map', mapSchema,'map')

const rankSchema = new mongoose.Schema({
    name: String,
    value: Number
})

const Rank = mongoose.model('Rank', rankSchema,'rank')


const hotSchema = new mongoose.Schema({
    name: String,
    children: []
})

const Hot = mongoose.model('Hot', hotSchema,'hotproduct')

const stockSchema = new mongoose.Schema({
    name: String,
    stock: Number,
    sales: Number
})

const Stock = mongoose.model('Stock', stockSchema,'stock')

exports.Budget = Budget
exports.Seller = Seller
exports.Trend = Trend
exports.Map = Map
exports.Rank = Rank
exports.Hot = Hot
exports.Stock = Stock