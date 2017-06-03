<template>
     <div>
        <div class="header_filx">
            <div class="headerLeft">
                <router-link tag="i" class="iconfont icon-back" to="/about"></router-link>
            </div>
            <div class="headerTitle">
                我的收藏
            </div>
        </div>
        <section>
            <nav>
                <ul>
                    <li v-for="(data,index) in list" :class="conindex==index?'active':''" @click="handelClick(index)">{{data}}</li>
                </ul>
            </nav>
            <ul class="li_con">
                <li v-for="(data,index) in listId" @click="tolistdetail(data.id)">

                    <div class="li_con">
                        <div class="im left">
                            <img :src="data.image_480" alt="">
                        </div>
                        <div class="right">
                            <h4>{{data.store_name}}</h4>
                            <p class="agio">会员享受7.8折优惠</p>

                            <p class="price"><span>{{data.buy_num}}</span><i class="iconfont icon-accountfilling"></i></p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
      </div>
</template>


<script >
    import Api from "../../api";
    import router from "../../router";
    import { Indicator } from 'mint-ui';
    export default{
        // this.$store.state.datalist[0]
        mounted(){
            if(!localStorage.getItem("userName")){
                router.push("/login");
            }else{
                Indicator.open();
                axios.post(Api.interface+`/api/datafetsh`,{      //在数据库中查看该用户是否有该商品
                username:localStorage.getItem("userName")
                }).then(res=>{
                    // console.log(this.id);
                    // console.log(res.data);
                    for(var i = 0;i<res.data.length;i++){

                        // console.log(res.data.length)
                        axios.get(Api.interface+`/api/details?id=${res.data[i].shopId}`).then(res=>{  //向后台请求数据
                            console.log(res.data.youhui_info)
                            this.listId.push(res.data.youhui_info);
                        })
                    }
                    Indicator.close();
                })
            }

        },
        data () {
            return {
                list:[
                    "优惠",
                    "商家"
                ],
                conindex:0,
                listId:[],
            }
        },
        methods:{
            handelClick(index){
                this.conindex = index;
            },
            tolistdetail(data){
                console.log(data)
                router.push(`/list/all/${data}`); //es6的字符串模板
            }
        }
    }
</script>


<style lang="scss" scoped>
    body,html{
        width:100%
    }
    .header_filx{
                height:1.2rem;
                width:100%;
                position:fixed;
                top:0;
                background:white;
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
            .headerTitle{
                position:absolute;
                right:2.5rem;
                top:0;
                width:3.5rem;
                font-size:0.45rem;
                line-height:1.2rem;
                text-indent:1.1rem;
            }
        }
    section{
        width:100%;
        padding-top:1.2rem;
        overflow:hidden;
        nav{
            width:100%;
            ul{
                width: 100%;
                border-bottom:.01rem solid #aaa;
                display:flex;
                li{
                    width: 50%;
                    list-style:none;
                    text-align:center;
                    line-height:1rem;
                }
            }
        }
    }
    .active{
        color:#F64744;
        border-bottom:1px solid #F64744;
    }
    .li_con{
            width: 100%;
        li{
            height:1.5rem;
            padding:.2rem;
            border-bottom:1px solid #ccc;
            overflow:hidden;
            .left{
                float:left;
                width: 2.4rem;
                height:1.6rem;
                padding-right:.2rem;
                img{
                    width:100%;
                }

            }
            .right{
                // float:left;
                .agio{
                    font-size:.1rem;
                }
                .price{
                    padding-top:.3rem;
                    span{
                        float:right;
                        font-size:.2rem;
                        color:#aaa;
                    }
                    i{
                        float:right;
                        color:#aaa
                    }
                }
            }
        }
    }
</style>