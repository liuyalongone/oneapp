/**
 * Created by Administrator on 2017/4/17.
 */
var http = require("http"); //
function spider(path,callback){
    var options = {
        hostname: 'm.1c10.cn',
        port: 80,
        path:path,
        method: 'GET'
    };
//使用 http.request() 必须总是调用 req.end() 来表明请求已经结束，即使没有数据被写入请求主体。
    var data = "";
    var req = http.request(options,function(res){


        res.on("data",function(chunk){
            data+=chunk;
        })

        res.on("end",function(){
            //console.log(data);
            callback(data);
        })
    })

    req.end();
}

//exports.kerwinspider = spider;
module.exports = spider;