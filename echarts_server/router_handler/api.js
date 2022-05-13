const { Budget, Seller, Trend, Map, Rank, Hot, Stock  } = require('../db/index')
const status = require('../store/index')
const path = require('path')
const fileUtils = require('../utils/file_utils')

// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end",function(){
        let parseData = parseQueryStr( postdata )
        resolve( parseData )
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

exports.budget = async(ctx, next) => {
	 const result=await  Budget.find()
			
	       ctx.response.body ={
	            status: 0,
	            message: '获取budget数据成功',
	            data: result
	        }
    
	
}

exports.seller = async(ctx, next) => {
    const result=await  Seller.find()
    			
          ctx.response.body ={
               status: 0,
               message: '获取selller数据成功',
               data: result
           }
	
}

exports.trend = async(ctx, next) => {
   const result=await  Trend.find()
   			
         ctx.response.body ={
              status: 0,
              message: '获取trend数据成功',
              data: result
          }
	
}

exports.updateRank = async(ctx, next) =>{
	let postData = await parsePostData( ctx )
	const result=await  Rank.updateOne(postData)
				
	      ctx.response.body ={
	           status: 0,
	           message: '修改rank数据成功',
	          
	       }
   
	
}

exports.map = async(ctx, next) => {
	
    const result=await Map.find()
		
       ctx.response.body ={
            status: 0,
            message: '获取map数据成功',
            data: result
        }
	  
		console.log(ctx)
    
	
	
	// 
}


exports.rank = async(ctx, next) => {
   const result=await Rank.find()
   			
         ctx.response.body ={
              status: 0,
              message: '获取rank数据成功',
              data: result
          }
}

exports.hot = async(ctx, next) => {
    const result=await  Hot.find()
    			
          ctx.response.body ={
               status: 0,
               message: '获取hot数据成功',
               data: result
           }
	
}

exports.stock = async(ctx, next) => {
   const result=await  Stock.find()
   			
         ctx.response.body ={
              status: 0,
              message: '获取stock数据成功',
              data: result
          }
	
}

exports.chinamap = async(ctx, next) => {
    let filePath = '../map/china.json'
    filePath = path.join(__dirname, filePath)
    const ret = await fileUtils.getFileJsonData(filePath)
    ctx.response.body ={
        status: 0,
        message: '获取china数据成功',
        data: ret
    }
	
}

exports.provincemap = async(ctx, next) => {
	
    let province = ctx.params;
    console.log('province', province);
    if (province == 'undefined') {
        ctx.response.body ={
            status: 1,
            message: '请求数据失败'
        }
    } else {
        let filePath = `../map/province/${ctx.params.name}.json`
        filePath = path.join(__dirname, filePath)
        const ret = await fileUtils.getFileJsonData(filePath, province)
        // console.log(ret);
       ctx.response.body ={
            status: 0,
            message: '获取province数据成功',
            data: ret
        }
    }
	
}