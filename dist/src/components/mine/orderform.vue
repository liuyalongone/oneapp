<template>
     <div>
        <div class="header_filx">
            <div class="headerLeft">
                <i class="iconfont icon-back" to="/about" @click="backToAbout"></i>
            </div>
            <div class="headerTitle">
                买单订单
            </div>
        </div>
        <section class="swichTag">
            <nav>
                <ul>
                    <li v-for="(data,index) in datalist" :class="conindex==index?'active':''" @click="handelClick(index,data.addr)">{{data.title}}</li>
                </ul>
            </nav>
        </section>
            <component :is="currentaddr"></component>
      </div>
</template>


<script >
import router from "../../router";
import allPay from "./payTag/allpay.vue";
import alreadyPay from "./payTag/alreadypay.vue";
import waitPay from "./payTag/waitpay.vue";
    export default{
        data () {
            return {
                datalist:[
                    {title:"全部",addr:"allpay"},
                    {title:"待付款",addr:"waitpay"},
                    {title:"已付款",addr:"alreadypay"},
                    {title:"已完成"}
                ],
                conindex:0,
                currentaddr:""
            }
        },
        methods:{
            handelClick(index,addr){
                this.conindex = index;
                this.currentaddr = addr;
            },
            backToAbout(){
                router.push("/about")
            }
        },
        components:{
            "allpay":allPay,
            "waitpay":waitPay,
            "alreadypay":alreadyPay,
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
    section.swichTag{
        width:100%;
        padding-top:1.2rem;
        overflow:hidden;
        nav{
            width:100%;
            ul{
                width: 133%;
                border-bottom:.01rem solid #aaa;
                display:flex;
                li{
                    width: 33%;
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
</style>