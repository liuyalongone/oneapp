/**
 * Created by Administrator on 2017/4/17.
 */
var express = require('express');
var router = express.Router();
var shop = require('./shop');

var spider = require("./spider");

//请求商品详情信息
router.get("/details",function(req,res){
    var id = req.query.id;
    spider("/index.php?act=deal&op=index&id="+id+"&ajax=1",function(data){
        res.send(data);
    })

    //res.send("eleapi");
})

//请求主页面信息
router.get("/",function(req,res){
    spider("http://m.1c10.cn/index.php?act=index&op=index&ajax=1",function(data){
        res.send(data);
    })
        console.log(req.session.kerwinuser); //获取浏览器传来的cookie(浏览器默认行为，自动传cookie给后端)
      //res.cookie("name","kerwin"); //往浏览器端 设置cookie

          if(!req.session.kerwinuser){
                // res.redirect("/login"); // 判断session 是否为空
                console.log("session为空")
          }else{
            //请求数据(所有文章的列表)，渲染页面
            console.log("session不为空")

          }

})



//请求分类信息( list页面的导航部分)
router.get("/list",function(req,res){
    spider("http://m.1c10.cn/index.php?act=list&op=getYouhuiClass&cate=all",function(data){
        res.send(data);
    })
    //res.send("eleapi");
})

router.get("/shoplist/",function(req,res){
    var city = req.query.city;
    var cate = req.query.cate;
    var listorder = req.query.listorder;
    spider("http://m.1c10.cn/list.html?city="+city+"&cate="+cate+"&ajax=1&listorder="+listorder,function(data){
            res.send(data);
        })
})

//请求搜索信息：
router.get("/search",function(req,res){

    var data = encodeURIComponent(req.query.k);
    console.log(data)
    spider("http://m.1c10.cn/list.html?u=1&k="+data+"&ajax=1",function(data){


        res.send(data);
    })
    //res.send("eleapi");
})
//请求搜索框的信息
router.get("/websearch",function(req,res){
    var current = req.query.shopName;
    /*正则表达式验证
    验证之前要先编码*/
    var testCurrent = encodeURIComponent(current);
    var testName = new RegExp("("+ testCurrent +"){1,}");
    //for循环遍历shop中的数组，跟正则匹配，把匹配到的放到一个数组中返回给前端
    var voidArr = [];
    for(var i = 0; i < shop.length; i++){
        //验证是否能匹配到正则，仍然要编码
        if(testName.test(encodeURIComponent(shop[i])) == true){
            voidArr.push(shop[i]);
        }
    }
    res.send(voidArr)
})




//注册
router.post("/register",function(req,res){
    console.log("qqqqq");
    dbhandle.user.find({
        phone:req.body.registerPhoneNum
    },function(error,result){
        if(!error){
            if(result.length>0){
                console.log("repeatedUserName")
            }else{
                dbhandle.user.create({
                    username:req.body.registerPhoneNum,
                    phone:req.body.registerPhoneNum,
                    password:req.body.registerPassword,
                    sex:1
                } ,function(error,result){
                    if(!error){
                        res.send("注册成功")
                    }
                })
            }
        }
    })

})


//验证是否登录
router.get("/logined",function(req,res){
    //console.log(req.session.kerwinuser);
    if(!req.session.kerwinuser){
        res.send(false)
    }else{
        res.send(req.session.kerwinuser.username)
    }
})





//登录
router.post("/login",function(req,res){
    dbhandle.user.find({
        phone:req.body.loginPhoneNum,
        password:req.body.loginPassword
    },function(error,result){
        if(!error){
            if(result.length>0){
                // res.send(req.body.loginPhoneNum)
                // console.log(result[0])
                req.session.kerwinuser = result[0];
                console.log(req.session)
                res.send([true,req.body.loginPhoneNum])
            }else{
                res.send([false])
            }
        }
    })

})
//修改用户名
router.post("/modify",function(req,res){
    dbhandle.user.update({
        phone:req.body.modifyPhone
    },{
        username:req.body.modifyName
    },function(error,result){
        if(!error){
            if(result.length>0){
                res.send([true,req.body.modifyName])
            }else{
                res.send([false])
            }
        }
    })

})

//保存、删除商品ID
router.post("/shopSave",function(req,res){
    // console.log(req.body.username);


    dbhandle.shopChar.find({
        shopId:req.body.shopSaveId
    },function(error,result){
        if(!error){
            if(result.length>0){
                dbhandle.shopChar.remove({
                    shopId:req.body.shopSaveId
                } ,function(error,result){
                    if(!error){
                        console.log("删除成功")
                        res.send("删除成功")
                    }
                })
            }else{
                console.log(req.body.shopSaveId);
                dbhandle.shopChar.create({
                    shopId:req.body.shopSaveId,
                    username:req.body.username
                } ,function(error,result){
                    if(!error){
                        res.send("保存成功")
                    }
                })
            }
        }
    })

})

//取商品id
router.post("/datafetsh",function(req,res){
    dbhandle.shopChar.find({
        username:req.body.username
    },function(error,result){
        console.log(result)
        res.send(result)

    })

})


//addpaycar
router.post("/paycar",function(req,res){
    dbhandle.user.find({
        phone:req.body.payuser
    },function(error,result){
        if(!error){
            if(result.length=1){
                dbhandle.paycar.create({
                    username:req.body.payuser,
                    payid:req.body.payid,
                    paynum:req.body.paynum
                } ,function(error,result){
                    if(!error){
                        console.log(result);
                        res.send(result);
                    }
                })
            }else{
                console.log("repeatedUserName")
            }
        }
    })
})
//findpaycar
router.post("/findpaycar",function(req,res){
    dbhandle.paycar.find({
        username:req.body.payuser,
    },function(error,result){
        if(!error){
            if(result.length>0){
                res.send(result);
            }else{
                res.send("购物车为空")
            }
        }
    })
})
//changenum
router.post("/changenum",function(req,res){
    dbhandle.paycar.update({
        payid:req.body.payid,
    },{
        paynum:req.body.paynum
    },function(error,result){
        if(!error){
            res.send(result)
        }
    })
})


module.exports= router;


