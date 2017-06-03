<template>
    <div class="detailBox">
    <div class="topFilx" :style="{opacity:0.008*this.scrolled}"></div>
        <div class="header_filx">

            <div class="headerLeft">
            <!-- <router-link tag="i" class="iconfont icon-back" to="/list/all"></router-link> -->
            <i class="iconfont icon-back" @click="goall"></i>
            </div>
            <div class="headerRight">
                <i class="iconfont icon-skip"></i>
                <i :class="change?'iconfont icon-favorite':'iconfont icon-favoritesfilling'" @click="CollectClick(youhui_info.id)"></i>
            </div>
        </div>
        <header>
            <img :src="youhui_info.images">
        </header>
        <section class="top">
            <h2>{{store.name}}</h2>
            <p>{{youhui_info.city_name}}</p>
            <ul class="iconUl">
                <li @click="callPhon"><i class="iconfont icon-phone"></i></li>
                <li><i class="iconfont icon-map"></i></li>
                <li><i class="iconfont icon-machinery"></i></li>
                <li><i class="iconfont icon-logistic"></i></li>
            </ul>
            <h4>{{store.address}}</h4>
            <p>查看全部分店<i class="iconfont icon-more"></i></p>
        </section>
        <section class="middle" v-if="isShow">
            <p>会员特权（敬请期待）</p>
            <p>买单立减<i class="iconfont icon-more"></i></p>
            <p>店内活动<i class="iconfont icon-more"></i></p>
            <p>
                更多信息
                <span id="time"><i class="iconfont icon-clock"></i><span>营业时间：{{buyinfo_list[1].info[0]}}</span></span>
            </p>
        </section>
    <footer>
        <div class="pay">暂不支持买单</div>
    </footer>
    </div>
</template>


<script>
        // window.onscroll = function(){
        //     var st = document.documentElement.scrollTop || document.body.scrollTop;

        // }


import Api from "../api";
import axios from "axios";
import router from "../router"
import "../assets/iconfont/iconfont.css";
    export default{
        mounted(){
            window.addEventListener('scroll', this.handleScroll);
            // axios.get("/api/details?id=6179").then(res=>{
                axios.get(Api.interface+`/api/details?id=${this.$route.params.shopDetaid}`).then(res=>{
                console.log(res)
                this.youhui_info = res.data.youhui_info;
                this.store = res.data.store;
                this.datalist = res.data;
                this.buyinfo_list = res.data.buyinfo_list;
                this.id = res.data.youhui_info.id;
                this.isShow = true;
                axios.post(Api.interface+`/api/datafetsh`,{      //在数据库中查看该用户是否有该商品
                    username:localStorage.getItem("userName")
                }).then(res=>{
                    console.log(this.id);
                    console.log(res.data);
                    // console.log(res.data[0].shopId);
                    for(var i = 0;i<res.data.length;i++){
                        if(this.id==res.data[i].shopId){
                            this.change = false;
                            console.log(this.change);
                            return;
                        }
                    }


                })
            })
        },
        updated(){
            // this.num = st;
            // console.log(111)
        },
        data(){
            return{
                youhui_info:{},
                buyinfo_list:{},
                store:{},
                datalist:{},
                change:true,
                id:0,
                login:"",
                isShow:false,
                scrolled: false
            }
        },
        methods:{
            handleScroll(){
                this.scrolled = document.body.scrollTop;
                // console.log(this.scrolled);
            },
            CollectClick(data){
                // console.log(data);
                this.change=!this.change;
                // this.$store.dispatch("ADD_SHOPCAR_ACTION",data);

                if(!localStorage.getItem("userName")){
                    router.push("/login");
                }else{
                    //保存数据
                    axios.post(Api.interface+'/api/shopSave', {
                        shopSaveId:data,//商品ID
                        username:localStorage.getItem("userName")  //用户信息

                    })
                    .catch(function (res) {
                        console.log(res);
                    })
                }

            },
            goall(){
                router.go(-1);
            },
            callPhon(){
                    plus.device.dial(this.store.tel[0].tel, false );
                    // plus.device.dial( "0573-88888888", false );
                }
        }
    }
</script>


<style lang="scss">
    .detailBox{
        .topFilx{
            width: 100%;
            height: 1.2rem;
            background: #fff;
            position:fixed;
            z-index:5;
        }
        .header_filx{
                height:1.2rem;
                width:100%;
                position:fixed;
                top:0;
                // background:white;
                z-index:6;
            .headerLeft{
                height:100%;
                line-height:0.1rem;
                width:1.5rem;
                text-align:center;
            }
            .headerLeft .iconfont{
                font-size:0.38rem;
                line-height:1.2rem;
                color:#ff4600;
            }
            .headerRight{
                line-height:0.1rem;
                position: absolute;
                width:2.5rem;
                height:100%;
                right:0;
                top:0;
                text-align:center;
            }
            .headerRight .iconfont{
                font-size:0.38rem;
                line-height:1.2rem;
            }
            .headerRight .icon-favorite{
                margin-left:0.2rem;
            }
            .headerRight .icon-favoritesfilling{
                margin-left:0.2rem;
            }
        }
        width: 100%;
        height: 16.2rem;
        header{
        height: 4rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .top{
        text-align:center;
        background: #fff;
        h2{
            padding:.3rem 0;
        }
        ul{
            width: 70%;
            margin:0 auto;
            display:flex;
            justify-content:space-between;
            li{
                width: .8rem;
                height: .8rem;
                list-style:none;
                margin:.3rem 0;
                border-radius:50%;
                &:nth-of-type(1){
                    background: #c7413e;
                }
                &:nth-of-type(2){
                    background: #348bd2;
                }
                &:nth-of-type(3){
                    background: #f9ce1d;
                }
                &:nth-of-type(4){
                    background: #8bc34a;
                }
            }
        }
        h4{
            padding:.4rem 0;
        }
        p{
            color:#888;
            font-size:.26rem;
            padding:.3rem 0;
        }
    }
    .middle{
        p{
            margin-top:.3rem;
            padding:.2rem .3rem;
            background: #fff;
            .icon-more{
                float:right;
            }
            #time{
                width: 100%;
                border-top:1px solid #aaa;
                display:block;
                padding:.1rem 0;
                .icon-clock{
                    margin-right:.2rem;
                }
                span{
                    font-size:.26rem;
                    color:#999999;
                }
            }
        }
    }

    }
    .iconUl{
        line-height:.8rem;
        text-align:center;
        .iconfont{
            font-size:.5rem;
        }
    }
footer{
    .pay{
        margin:.2rem;
        line-height: .7rem;
        background: #999999;
        border-radius:.1rem;
        color:#fff;
        text-align:center;
    }
}
</style>