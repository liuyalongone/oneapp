<template>
    <div class="choose_city">
        <div>
            <p class="city_title">
                <router-link class="city_back iconfont icon-back" to="/about" tag="i"></router-link>
                我的钱包
            </p>
            <p class="balance">钱包余额</p>
            <p class="rmb">
                <span>￥</span>
                {{num}}
            </p>
        </div>
        <router-link to="/recharge" tag="p" class="recharge">
            <i class="lock_icon iconfont icon-bags"></i>
            <span>充值</span>
            <i class="lock_next iconfont icon-more"></i>
        </router-link>
        <p class="password" @click="pay()">
            <i class="password_icon iconfont icon-security"></i>
            <span>支付密码</span>
            <i class="password_next iconfont icon-more"></i>
            <b>设置安全密码</b>

        </p>
    </div>
</template>

<script>
import router from "../../router"
export default {
    data(){
        return{
            num:'0.0'
        }
    },
    methods:{
        /*pay(){
            console.log(333)
            //接下来要axios.post向服务器发送一个request，服务器响应后在后台发送验证码到用户手机
            //然后再跳转页面
        }.then((res)=>{
            router.push("/paypassword")
        })*/
        pay(){
            router.push("/paypassword")
        }
    }
}
</script>

<style lang="scss" scoped>
    .choose_city{
        width:100%;
        height:100%;
        background:#f0f0f0;
        div{
            background:#4caf50;
            .icon-back{
                font-size:0.6rem;
                font-style:normal;
                color:#fff;
                font-weight: 400;
                position:absolute;
                top:0.05rem;
                left:0.1rem;
            }
            .city_title{
                font-weight: normal;
                height:0.8rem;
                text-align: center;
                line-height: 0.8rem;
                font-size:0.4rem;
                position:relative;
                background: #4caf50;
                color:#fff;
            }
            .balance{
                margin-top:0.4rem;
                height:0.8rem;
                line-height: 0.8rem;
                margin-left:0.3rem;
                color:#fff;
            }
            .rmb{
                span{
                    font-size:0.3rem;
                }
                margin-left:0.3rem;
                height:1rem;
                line-height: 1rem;
                color:#fff;
                font-size:0.45rem;
            }
        }
        .recharge{
            background: #fff;
            height:1rem;
            line-height: 1rem;
            margin-top:0.2rem;
            border-top:1px solid #d7d7d7;
            border-bottom:1px solid #d7d7d7;
            font-size:0.35rem;
            .lock_icon{
                float:left;
                margin-left:0.3rem;
                color:#999999;
            }
            span{
                float:left;
                margin-left:0.2rem;
                color:#333333;
            }
            .lock_next{
                float:right;
                font-size:0.35rem;
                margin-right:0.3rem;
            }
        }
        .password{
            font-size:0.35rem;
            background: #fff;
            height:1rem;
            line-height: 1rem;
            margin-top:0.2rem;
            border-top:1px solid #d7d7d7;
            border-bottom:1px solid #d7d7d7;
            .password_icon{
                float:left;
                margin-left:0.3rem;
                color:#999999;
            }
            span{
                float:left;
                margin-left:0.2rem;
                color:#333333;
            }
            b{
                float:right;
                font-size:0.2rem;
                margin-right:0.1rem;
                color:#9d9d9d;
            }
            .password_next{
                float:right;
                font-size:0.35rem;
                margin-right:0.3rem;
            }
        }
    }
</style>