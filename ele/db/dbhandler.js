/**
 * Created by Administrator on 2017/4/13.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema; //概要

var user = {
    username:String,
    phone:String,
    password:String,
    sex:Number
} //将要存储的数据格式以及字段格式


var paycar = {
  username:String,
  payid:String,
  paynum:Number
}
//购物车表
var shopChar= {
    username:String,
    shopId:String
}

mongoose.model("user",new Schema(user));
mongoose.model("paycar",new Schema(paycar));
mongoose.model("shopChar",new Schema(shopChar)); //创建一个模型，通过这个模型将来直接操作集合
// model是article, 集合名字对应就是articles


module.exports = {
    user:mongoose.model("user"),
    shopChar:mongoose.model("shopChar"),
    paycar:mongoose.model("paycar")
}