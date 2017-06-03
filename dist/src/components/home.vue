<template>
    <div id="main">
    <!-- 头部部分 -->
        <header>
            <router-link class="header_left" to="/city" tag="div">
                <span>桐乡</span>
                <i class="iconfont icon-moreunfold"></i>
            </router-link>
            <router-link class="header_center" to="/search" tag="div">
                <i class="iconfont icon-search search_icon"></i>
                <input type="text" placeholder="商家、品类、商圈" id="header_search">
            </router-link>
            <router-link to="/message" tag="i" class="message iconfont icon-remind1"></router-link>
            <i class="qr_code iconfont icon-qrcode" @click="camera"></i>
        </header>
        <!-- 轮播图部分 -->
        <section class="banner">
            <mt-swipe :auto="2000">
              <mt-swipe-item>
                <img src="http://group.1c10.cn/data/upload/shop/adv/05472216619378021.jpg"/>
              </mt-swipe-item>
              <mt-swipe-item>
                <img src="http://group.1c10.cn/data/upload/shop/adv/05324532026713205.jpg"/>
              </mt-swipe-item>
            </mt-swipe>
        </section>

        <!-- 导航部分 -->
        <section class="list">
                <mt-swipe :auto="0">
                    <mt-swipe-item class="inflex">
                        <div v-for="(data_first,index) in datalist_first" class="liflex" @click="firstClick(data_first.ename,data_first.name)">
                            <img :src="data_first.icon_url">
                            <p class="list_font">{{data_first.name}}</p>
                        </div>
                    </mt-swipe-item>
                    <mt-swipe-item class="inflex">
                        <div v-for="(data_second,index) in datalist_second" class="liflex" @click="secondClick(data_second.ename)">
                            <img :src="data_second.icon_url">
                            <p class="list_font">{{data_second.name}}</p>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
        </section>
        <!-- 列表选项 -->
        <section class="item">
            <p class="foryou">为你精选</p>
            <ul class="select"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
            >
                <li v-for="(data_item,index) in datalist_item" @click="handleClick(data_item)">
                    <img v-lazy="data_item.image_240" class="item_left">
                    <div class="item_right">
                        <h4>
                            {{data_item.store_name}}
                        </h4>
                        <p>
                            <span>{{data_item.city_name}}</span>
                            {{data_item.subtitle}}
                        </p>
                        <div class="calc">
                            <span>￥{{data_item.price}}</span>
                            <i>￥{{data_item.origin_price}}</i>
                            <b>下载:{{data_item.buy_num}}</b>
                        </div>
                    </div>

                </li>
                <li>{{loadWhat}}</li>
            </ul>
        </section>
        <one-footer>
            <ul class="navlist" >
              <!-- router-link 支持tag 标签  -->
              <router-link active-class="ycActive" tag="li" to="/home"><p class="iconfont icon-viewlist"></p>首页</router-link >
              <router-link active-class="ycActive" tag="li" to="/list"><p class="iconfont icon-store"></p>商家</router-link >
              <router-link active-class="ycActive" tag="li" to="/about"><p class="iconfont icon-bussinessman"></p>我的</router-link >
              <router-link active-class="ycActive" tag="li" to="/more"><p class="iconfont icon-navlist"></p>更多</router-link >
            </ul>
        </one-footer>
    </div>
</template>

<script>
import Api from "../api";
import "../assets/iconfont/iconfont.css";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css"; //单独引入swiper css文件
import Vue from 'vue';
import Mint from 'mint-ui';
import { Indicator } from 'mint-ui';
import router from "../router"
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(Mint);

import { Lazyload} from 'mint-ui';
import { Swipe, SwipeItem ,InfiniteScroll} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(InfiniteScroll);
import 'mint-ui/lib/style.css'
export default {
    data(){
        return {
            datalist_all:[],
            datalist_first:[],
            datalist_second:[],
            datalist_item:[],
            num:0,//定义一个存储累加变量
            norepeat:[],
             loadWhat:""
        }
    },
    mounted(){

        Indicator.open();
        //请求后台数据
        axios.get(Api.interface+"/api/").then(res=>{
            new Swiper('.swiper-container',{
                pagination: '.swiper-pagination', //初始化 分页器
                paginationClickable: true, //分页器可以点击
                // autoplay: 1000,
                // loop:true,
                speed:2000
            });
            this.datalist_all = Array.from(res.data.category);
            this.datalist_first = res.data.category.splice(0,8)
            this.datalist_second = this.datalist_all.splice(8,8)
            this.datalist_item = res.data.data;


            // console.log(this.datalist_first);
            console.log(this.datalist_first);
            Indicator.close();

        })
//cccc----------------------------------------------------------------------------
        //第一次刷新的时候判断是否存储着数据
        if(window.localStorage.getItem("data") == null){
            window.localStorage.setItem("data",JSON.stringify([]))
        }


//----------------------------------------------------------------------------
    },
    methods:{

        camera(){
            var cmr = plus.camera.getCamera();
            console.log(cmr.supportedImageResolutions);
            var res = cmr.supportedImageResolutions[0];
            var fmt = cmr.supportedImageFormats[0];
            console.log("Resolution: "+res+", Format: "+fmt);
            cmr.captureImage( function( path ){
                    alert( "Capture image success: " + path );  //path相对路径

                },
                function( error ) {
                    alert( "Capture image failed: " + error.message );
                },
                {resolution:res,format:fmt}
            );
        },

        handleClick(data){
            router.push(`/detail/${data.id}`); //es6的字符串模板


// cccc------------------------------------------------------------------------------------------

            //应用中的浏览记录中有浏览时间。下面是获取存数据的当天的时间
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth();
            var date = time.getDate();
            var theDay = year + "-" + month + "-" + date;
            //给data添加一个属性，value值是这个时间
            data.computedTime = theDay;
            //每次点击的时候先把data中的数组取出来
            var list = Array.from(JSON.parse(window.localStorage.getItem("data")));
            // console.log(typeof window.localStorage.getItem("data"))
                if (list.length == 0){
                    list.unshift(data);
                }else{
                    for (var i = 0; i < list.length; i++){
                        if (data.id == list[i].id){
                            list.splice(i,1);//把重复的那个对象删除
                        }
                    }
                    list.unshift(data)//再向数组中添加对象
                }
            window.localStorage.setItem("data",JSON.stringify(list))



// ---------------------------------------------------------------------------------------------



        },
        firstClick(id,data){
            this.$store.dispatch("SAVE_CATE",data);
            router.push(`/list/all/?cate=${id}&city=all&listorder=0`); //es6的字符串模板
        },
        secondClick(id){
            router.push(`/list/all/?cate=${id}&city=all&listorder=0`); //es6的字符串模板
        },
        loadMore() {
            this.loading = true;
            if(this.nowPage > 5){
                this.loadWhat = "没有更多的数据了"
                return;
            }
            //请求后台数据
            axios.get(Api.interface+"/api/",{
                params:{
                    countPage:5,
                    page:this.nowPage++
                }
            }).then(res=>{
                this.datalist_all = Array.from(res.data.category);
                this.datalist_first = res.data.category.splice(0,8)
                this.datalist_second = this.datalist_all.splice(8,8)
                this.datalist_item = [...this.datalist_item,...res.data.data];
            })
            this.loadWhat = "上滑加载更多的数据..."
            this.loading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
#main{
    width:100%;
    height:100%;
    background:#f0f0f0;
}
//头部
header{
    height:0.94rem;
    width: 100%;
    position:fixed;
    top:0;
    left:0;
    z-index:10;
    display: block;
    background:#ff5722;
    &:hover{
        display: block;
        clear:both;
        content:"";
    }
    .header_left{
         float:left;
         margin-left:0.2rem;
         margin-top:0.08rem;
         span{
            line-height:0.88rem;
            color:#fff;
            font-size:0.32rem;
            text-overflow: ellipsis;
            overflow:hidden;
         }
         i{
            color:#fff;
            font-size:0.36rem;
         }
    }
    .header_center{
        float:left;
        width:3.1rem;
        position:relative;
        margin-left:0.65rem;
        margin-top:0.2rem;
        .search_icon{
            position:absolute;
            top:0.15rem;
            left:0.2rem;
            color:#F64744;
        }
        #header_search{
            width:4rem;
            height:0.60rem;
            font-size:0.26rem;
            line-height:0.60rem;
            border-radius: 0.3rem;
            text-indent: 0.6rem;
            outline:none;
            border:none;
            &:focus{
                color:#ff5722;
            }
        }
    }
    .qr_code{
        float:right;
        color:white;
        margin-right:0.2rem;
        margin-top:0.3rem;
    }
    .message{
        float:right;
        color:white;
        margin-right:0.2rem;
        margin-top:0.3rem;
    }
}
// 轮播图部分
.banner{
    width:100%;
    margin-top:0.94rem;
    height:2.22rem;
    overflow: hidden;
    img{
        width:100%;
        height:2.22rem;
    }
}
// 导航栏
.list{
    margin-top:0.13rem;
    width:100%;
    overflow: hidden;
    height:3.14rem;
    .inflex{
        width:100%;
        height:3rem;
        background:white;
        padding-top:0.14rem;
        .liflex{
            float:left;
            list-style:none;
            width:25%;
            text-align: center;
            margin-bottom: 0.2rem;
            img{
                width:0.8rem;
            }
            p{
                text-align: center;
                font-size:0.28rem;
                color:#000000;
            }
        }
    }

}
                                        // 列表选项
.item{
    margin-top:0.13rem;
    width:100%;
    background:white;
    .foryou{
        margin-left:0.1rem;
        height:0.6rem;
        font-size:0.28rem;
        line-height: 0.6rem;
    }
    ul{
        background:white;
        li{
            list-style:none;
            border-top:1px solid #d7d7d7;
            height:1.62rem;
            padding:0.2rem 0.16rem;;
            &:after{
                content:"";
                display: block;
                clear:both;
            }
            img{
                width:2.36rem;
                float:left;
            }
            .item_right{
                float:right;
                h4{
                    line-height: 0.32rem;
                    font-size:0.32rem;
                    color:#1a1a1a;
                    padding-bottom:0.05rem;
                    overflow:hidden;
                    font-weight:normal;
                }
                p{
                    white-wrap:wrap;
                    width:4.62rem;
                    font-size:0.24rem;
                    height:0.64rem;
                    color:#a3a3a3;
                    overflow: hidden;
                }
                .calc{
                    padding-top:15px;
                    font-size:0.24rem;
                    line-height: 0.24rem;
                    color:#9b9b9b;
                    &:after{
                        content:"";
                        clear:both;
                        display: block;
                    }
                    span{
                        color:#ff5722;
                        font-size:0.42rem;
                        font-weight: 700;
                        float:left;
                    }
                    i{
                        font-style:normal;
                        float:left;
                        margin-left:0.35rem;
                        text-decoration: line-through;
                    }
                    b{
                        float:right;
                        font-weight: normal;
                        font-size:0.3rem;
                    }
                }
            }
            image[lazy=loading] {
              width: 40px;
              height: 300px;
              margin: auto;
            }
        }
    }
}
</style>
