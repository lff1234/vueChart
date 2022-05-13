const WebSocket = require('ws')
const WebSocketApi = require('../router_handler/websocket_api')
const { collectName } = require('../store/index')
// 创建出websocket实例对象
const wss = new WebSocket.Server({
    port: 9998
})

const status = require('../store/index')


module.exports.listen = function () {
    wss.on('connection', async ws => {
        console.log('有客户连接');
        ws.on('message', async msg => {
            // 客户端发过来的是JSON数据
            let playload = JSON.parse(msg)
            if (playload.action === 'getData') {
                const ret = await WebSocketApi.getDataByChartName(playload.chartName)
                // console.log(ret);
                // 增加data字段
                playload.data = ret;
                ws.send(JSON.stringify(playload))
            } else{
                // 主题切换，全屏切换，进行每个客户端的同步，收到什么数据就发送什么数据
                wss.clients.forEach(client => {
                    console.log('********************');
                    client.send(msg)
                })
            }
        });
        setInterval(async () => {
            // console.log(status);
            if (status.flag) {
                const ret = await WebSocketApi.getDataByChartName(status.chartName)
                const playload = {
                    action: 'getData',
                    socketType: status.socketType,
                    chartName: status.chartName
                }
                playload.data = ret;
                // console.log(playload);
                // console.log(ret);
                ws.send(JSON.stringify(playload))
                status.flag = false
                status.socketType = ''
                status.chartName = ''
            }
        }, 5000);
    })
}