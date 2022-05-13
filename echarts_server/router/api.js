// const express = require('express')

// const router = express.Router()
const apiHandler = require('../router_handler/api')
const router=require('koa-router')()
// // 
const routers=router
.get('/budget', apiHandler.budget)

// 商家销量
.get('/seller', apiHandler.seller)

.get('/trend', apiHandler.trend)


.get('/map', apiHandler.map)
.get('/chinamap', apiHandler.chinamap)
.get('/provincemap/:name', apiHandler.provincemap)

.get('/rank', apiHandler.rank)
.post('/updateRank', apiHandler.updateRank)

.get('/hot', apiHandler.hot)

.get('/stock', apiHandler.stock)

module.exports = routers
