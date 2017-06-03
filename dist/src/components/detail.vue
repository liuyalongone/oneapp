<template>
    <div class="detailBox">
        <header>
            <div class="headerLeft">
                <i class="iconfont icon-back" @click="goback"></i>
            </div>
            <div class="headerTitle">
                团购详情
            </div>
            <div class="headerRight">
                <i class="iconfont icon-skip"></i>
                 <i :class="change?'iconfont icon-favorite':'iconfont icon-favoritesfilling'" @click="CollectClick(youhui_info.id)"></i>
            </div>
        </header>

        <section class="bannerBox">
            <img :src="youhui_info.images">
            <div class="bannerBg">
                <h4>{{store.name}}</h4>
                <p>{{youhui_info.subtitle}}</p>
            </div>
        </section>

        <section class="priceBox">
            <div class="pbTop">
                <div>
                    <span>￥{{table_list.price}}.0</span>
                    <del>门店价￥{{table_list.origin_price}}.0</del>
                    <button @click="toPay(allInfo)">加入购物车</button>
                </div>
            </div>
            <div class="pbBottom">
                <i class="iconfont icon-selected"></i>免费下载
                <i class="iconfont icon-selected"></i>到店付款
            </div>
        </section>
        <section class="titleBox">
            <div class="tbTop">
                {{store.name}}
            </div>
            <div class="tbMiddle">
                <div class="tbmLeft">
                    {{store.address}}
                </div>
                <div class="tbmRight">
                    <i class="iconfont icon-phone"></i>
                </div>
            </div>
            <div class="tbBottom">
                查看分店
            </div>
        </section>
        <section  class="mealBox">
            <div class="mbTop">
                <div class="mbtLeft">
                    套餐详情
                    <i class="iconfont icon-form"></i>
                </div>
                <div class="mbtRight">
                    查看图文详情
                </div>
            </div>
            <div class="mbMiddle">
                {{table_list_datalistname}}
            </div>
            <div class="mbBottom">
                <p class="firstP">·使用规则：{{youhui_info.title}}</p>
                <p class="lastP">·{{youhui_info.subtitle}}</p>
            </div>
        </section>
        <section class="noticeBox">
            <div class="nbTop">消费提示</div>
            <ul class="nbUl">
                <li>有效期
                    <p>{{buyinfo_list_info0}}</p>
                </li>
                <li>使用时间
                    <p>{{buyinfo_list_info1}}</p>
                </li>
                <li>限购限用提醒
                    <p>{{buyinfo_list_info2}}</p>
                </li>

            </ul>
        </section>
    </div>
</template>


<script>
import Api from "../api";
import router from "../router";
import axios from "axios";
import { Indicator } from 'mint-ui';
import "../assets/iconfont/iconfont.css";
    export default{
        mounted(){
            Indicator.open();

            axios.get(Api.interface+`/api/details?id=${this.$route.params.shopid}`).then(res=>{
                console.log(res.data)
                this.youhui_info = res.data.youhui_info;
                this.store = res.data.store;
                this.table_list = res.data.table_list[0];
                this.table_list_datalistname=res.data.table_list[0].data[0].list[0].name;
                this.buyinfo_list_info0 = res.data.buyinfo_list[0].info[0];
                this.buyinfo_list_info1 = res.data.buyinfo_list[1].info[0];
                this.buyinfo_list_info2 = res.data.buyinfo_list[2].info[0];
                Indicator.close();
// -----------------------------------------------------------------------------------------
                this.allInfo = res.data;
            })
        },
        data(){
            return{
                youhui_info:{},
                store:{},
                table_list:{},
                table_list_datalistname:"",
                buyinfo_list:{},
                buyinfo_list_info0:"",
                buyinfo_list_info1:"",
                buyinfo_list_info2:"",

                //收藏数据
                change:true,
                id:0,
                login:""
            }
        },
        methods:{
            goback(){
                router.go(-1);
            },
            //购物车
            toPay(allInfo){
                this.$store.dispatch("GET_DETAILS_ACTION",this.allInfo)
            },

            //收藏
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

            }
        }
    }
</script>


<style lang="scss" scoped>
.detailBox{
    height:17rem;
    background:#f0f0f0;
    width:100%;
    overflow-x:hidden;
}
.left{
    float:left;
}
.right{
    float:right;
}
header{
    height:1.2rem !important;
    width:100%;
    position:relative;
    background:white;
}
header .headerLeft{
    height:100%;
    line-height:0.1rem;
    width:1.5rem;
    text-align:center;
}
header .headerLeft .iconfont{
    font-size:0.38rem;
    line-height:1.2rem;
    color:#ff4600;
}
header .headerRight{
    line-height:0.1rem;
    position: absolute;
    width:2.5rem;
    height:100%;
    right:0;
    top:0;
    text-align:center;
}
header .headerRight .iconfont{
    font-size:0.38rem;
    line-height:1.2rem;
}
header .headerRight .icon-favorite{
    margin-left:0.2rem;
}
header .headerTitle{
    position:absolute;
    right:2.5rem;
    top:0;
    width:3.5rem;
    font-size:0.45rem;
    line-height:1.2rem;
    text-indent:1.1rem;
}
.bannerBox{
    height:5rem;
    width:100%;
    background:gray;
    position: relative;
}
.bannerBg{
    height:1.95rem;
    width:100%;
    background:rgba(0,0,0,0.5);
    position:absolute;
    left:0;
    bottom:0;
    color:white;
    h4{
        font-size:0.42rem;
        font-weight:100;
        line-height:0.8rem;
        margin-left:0.46rem;
    }
    p{
        margin-left:0.46rem;
        line-height:0.4rem;
    }
}
.bannerBox>img{
    width:100%;
    height:100%;
}
.priceBox{
    overflow:hidden;
    background:white;
    height:2.2rem;
    width:100%;
    border-bottom:1px solid #d5d5d5;
    .pbTop{
        height:1.2rem;
        border-bottom:1px solid #d5d5d5;
        div{
            span{
                font-size:0.6rem;
                color:#ff5522;
                line-height:1.2rem;
            }
            del{
                line-height:1.2rem;
                color:#9f9f9f;
            }
            button{
                float:right;
                height:1.2rem;
                width:3rem;
                font-size:0.28rem;
                border:none;
                outline:none;
                color:white;
                background:#ff940a;
            }
        }
    }
    .pbBottom{
        line-height:1rem;
        color:#53b15b;
        border-bottom:1px solid #d7d7d7;
        .iconfont{
            font-size:0.5rem;
            color:#59a014;
        }
        .icon-icondownload{
            font-size:0.4rem;
            margin-left:1.8rem;
        }
    }
}
.titleBox{
    height:2.8rem;
    width:100%;
    background:white;
    margin-top:0.14rem;
    border-top:1px solid #d7d7d7;
    border-bottom:1px solid #d7d7d7;
    .tbTop{
        width:100%;
        height:0.8rem;
        line-height:0.8rem;
        font-weight:900;
        font-size:0.36rem;
        margin-left:0.14rem;
        border-bottom:1px solid #d9d9d9;
    }
    .tbMiddle{
        width:100%;
        height:1.2rem;
        border-bottom:1px solid #d7d7d7;
        margin-left:0.14rem;
        .tbmLeft{
            width:4rem;
            height:100%;
            float:left;
            font-size:0.3rem;
            line-height:0.55rem;
            color:#9a9a9a;
        }
        .tbmRight{
            width:2rem;
            height:100%;
            float:right;
            color:#f05d0f;
            text-indent:0.7rem;
            border-left:1px solid #d7d7d7;
            .iconfont{
                font-size:0.7rem;
                line-height:1.2rem;
            }
        }
    }
    .tbBottom{
        color:#a1a1a1;
        line-height:0.8rem;
        text-indent:0.14rem;
    }
}
.mealBox{
    background:white;
    border-top:0.01rem solid #d7d7d7;
    margin-top:0.2rem;
    .mbTop{
        height:0.6rem;
        border-bottom:0.01rem solid #d7d7d7;
        margin-left:0.24rem;
        .mbtLeft{
            float:left;
            line-height:0.6rem;
            font-size:0.3rem;
            color:#8f8f8f;
            .iconfont{
                font-size:0.3rem;
            }
        }
        .mbtRight{
            float:right;
            line-height:0.6rem;
            color:#fd591c;
        }
    }
    .mbMiddle{
        height:0.8rem;
        line-height:0.8rem;
        margin-left:0.24rem;
        border-bottom:0.01rem solid #d5d5d5;
        font-family: "黑体";
    }
    .mbBottom{
        margin-left:0.24rem;
        font-size:0.29rem;
        font-family: "黑体";
        .firstP{
            padding-top:0.09rem;
        }
    }
}
.noticeBox{
    margin-top:0.2rem;
    background:white;
    height:4.2rem;
    .nbTop{
        height:0.8rem;
        margin-left:0.24rem;
        border-bottom:0.01rem solid #d5d5d5;
        line-height:0.8rem;
        color:#989898;
        font-family:"黑体";
        font-size:0.29rem;
    }
    .nbUl{
        margin-left:0.24rem;
        font-size:0.29rem;
        padding-bottom:1.02rem;
        li{
            line-height:0.5rem;
            color:#ff5527;
            list-style:none;
            p{
                color:#363636;
            }
        }
    }
}
</style>