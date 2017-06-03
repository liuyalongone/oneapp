<template>
    <form class="recharge" action="">
        <h3 class="city_title">
            <router-link class="recharge_back iconfont icon-back" to="/wallet" tag="i"></router-link>
            充值
        </h3>
        <p class="pay_num">
            <span>充值金额:</span>
            <input type="text" placeholder="输入金额">
        </p>
       <!--  <div class="pay">
            <div class="pay_left">
                <svg class="icon zhifubao" aria-hidden="true">
                  <use xlink:href="#icon-zhifubao"></use>
                </svg>
                <p>支付宝支付</p>
            </div>
            <input type="radio" name="sel" checked class="pay_right">
        </div>
        <div class="wechat">
            <div class="wechat_left">
                <svg class="icon weixin" aria-hidden="true">
                  <use xlink:href="#icon-weixin"></use>
                </svg>
                <p>微信支付</p>
            </div>
            <input type="radio" name="sel" class="weixin_right">
        </div> -->
        <div class="action">
            <input type="submit" value="确认充值" class="makesure">
        </div>
    </form>
</template>

<script>
// import "../../assets/wechat/iconfont.css"
// import "../../assets/wechat/iconfont.js"

export default {
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .recharge{
        width:100%;
        height:100%;
        background:#f0f0f0;
        i{
            font-size:0.6rem;
            font-style:normal;
            color:#f00;
            font-weight: 900;
            position:absolute;
            top:0.05rem;
            left:0.1rem;
        }
        h3{
            font-weight: normal;
            height:0.8rem;
            text-align: center;
            line-height: 0.8rem;
            font-size:0.4rem;
            position:relative;
            border-bottom:1px solid #ccc;
            background: white;
        }
        .pay_num{
            height:0.8rem;
            line-height:0.8rem;
            background: #fff;
            margin-top:0.2rem;
            padding-left:0.3rem;
            display: flex;
            flex-direction: row;
            input{
                outline: none;
                border:none;
                height:100%;
                text-align: right;
                flex:1;
                text-indent: 0.4rem;
                padding-right:0.4rem;
                &:focus{
                    color:#f00;
                }
            }
        }
        .pay{
            height:1rem;
            background: #fff;
            margin-bottom: 0.1rem;
            margin-top:0.3rem;
            .pay_left{
                float:left;
                height:100%;
                .zhifubao{
                    float:left;
                    height:0.6rem;
                    width:0.6rem;
                    margin-top:0.2rem;
                    margin-left:0.2rem;
                }
                p{
                    float:left;
                    height:100%;
                    font-size:0.32rem;
                    line-height: 1rem;
                    margin-left:0.4rem;
                }
            }
            .pay_right{
                float:right;
                width:0.4rem;
                height:0.4rem;
                margin-top:0.3rem;
                margin-right:0.2rem;
            }
        }
        .wechat{
            height:1rem;
            background: #fff;
            margin-bottom: 0.1rem;
            .wechat_left{
                float:left;
                height:100%;
                .weixin{
                    float:left;
                    height:0.5rem;
                    width:0.5rem;
                    margin-top:0.2rem;
                    margin-left:0.3rem;
                }
                p{
                    float:left;
                    height:100%;
                    font-size:0.32rem;
                    line-height: 1rem;
                    margin-left:0.4rem;
                }
            }
            .weixin_right{
                float:right;
                width:0.4rem;
                height:0.4rem;
                margin-top:0.3rem;
                margin-right:0.2rem;
            }
        }
        .action{
            position:fixed;
            bottom:0.2rem;
            left:0;
            width:100%;
            background: #fff;
            padding-top:0.2rem;
            .makesure{
                width:94%;
                height:0.8rem;
                margin-left:3%;
                background:#ff5722;
                border:none;
                outline: none;
                border-radius:0.2rem;
                font-size:0.35rem;
                color:#fff;
            }
        }
    }
</style>