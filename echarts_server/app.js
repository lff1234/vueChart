// const express = require('express')
// // 引入websocket
// const webSocketService = require('./service/web_socket_service')
// const app = express()

// // 导入 cors 中间件
// const cors = require('cors')
// app.use(cors())

// app.use(express.urlencoded({ extended: false }))

// // 导入并注册路由模块
// const apiRouter = require('./router/api')
// app.use('/api', apiRouter)


// app.listen(3007, () => {
//     console.log('api server is running');
// })

// webSocketService.listen()

//服务器的入口文件
//1.创建koa对象
const Koa = require('koa');
const app = new Koa();
//2.编写响应函数(中间件)
//ctx:上下文，web容器，ctx.request,ctx.response
//next:下一个中间件，下一层中间件是否能够得到执行，取决于next这个函数有没有被调用
//第一层中间件
const respDurationMiddleware = require('./middleware/koa_response_duration');
app.use(respDurationMiddleware);
//第二层中间件
const respHeaderMiddleware = require('./middleware/koa_response_header');
app.use(respHeaderMiddleware);
//第三层中间件
// const respDataMiddleware = require('./middleware/koa_response_data');
// app.use(respDataMiddleware);

// // 导入并注册路由模块
const router = require('./router/index')
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
//3.绑定端口号
app.listen(3000);

//开启服务端的监听,监听客户端的连接
const WebSocketService=require('./service/web_socket_service')
//当某一个客户端连接成功之后，就会对这个客户端进行message事件的监听
WebSocketService.listen()
