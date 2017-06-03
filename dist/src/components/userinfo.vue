<template>
    <div class="userinfoBox">
        <header>
            <div class="headerLeft">
                <i class="iconfont icon-back" @click="handleBackToAbout"></i>
            </div>
            <div class="headerTitle">
                个人信息
            </div>
        </header>
        <ul class="basicInfo">
            <li><i class="iconfont icon-video"></i>我的头像<span><i class="iconfont icon-atm"></i></span><i class="iconfont icon-more"></i></li>
            <li @click="toUserinfoUsername"><i class="iconfont icon-account"></i>{{this.$store.state.username}}<span>修改</span><i class="iconfont icon-more"></i></li>
            <li><i class="iconfont icon-gifts"></i>生日<span>修改</span><i class="iconfont icon-more"></i></li>
            <li @click="sexChange"><i class="iconfont icon-attachment"></i>性别 {{value}}<span>修改</span><i class="iconfont icon-more"></i></li>
        </ul>
        <ul class="settingInfo">
            <li>账户设置</li>
            <li><i class="iconfont icon-mobilephone"></i>绑定手机<span>修改</span></li>
            <li><i class="iconfont icon-discount"></i>登录密码<span>修改</span></li>
            <li><i class="iconfont icon-warning"></i>支付密码<span>修改</span></li>
        </ul>
        <button class="logoutButton" @click="handleLogout">退出登录</button>
        <div v-if="isShow" class="sexDiv" @click="hideDiv">
        </div>
        <mt-radio v-if="isShow" @click="hideDiv" class="mt-radio"
          v-model="value"
          title="性别"
          :options="['男', '女']">
        </mt-radio>
    </div>
</template>


<script >
import Api from "../api";
import Vue from 'vue';
import "../assets/iconfont/iconfont.css";
import router from "../router";
import axios from "axios";
import { Radio } from 'mint-ui';
Vue.component(Radio.name, Radio);
export default{
    data(){
        return{
            isShow:false,
            value:""
        }
    },
    mounted(){

    },
    methods:{
        handleLogout(){
            axios.post(Api.interface+'/api/login', {
                loginPhoneNum: "",
                loginPassword: ""
            })
            .then(function (res) {
                router.push("/about");
                localStorage.removeItem("userPhone");
                localStorage.removeItem("isShow");
                localStorage.removeItem("userName");
            })
            .catch(function (res) {
                console.log(res);
            })
        },
        handleBackToAbout(){
            router.push("/about");
        },
        toUserinfoUsername(){
            router.push("/userinfo/userinfousername");
        },
        sexChange(){
            this.isShow = true
        },
        hideDiv(){
            this.isShow = false;

        }
    },
    watch:{
         value:function(){
                   this.isShow = false;
                }
    }
}
</script>


<style lang="scss" scoped>
.userinfoBox{
        .mint-radiolist-title{
        font-size:0.3rem;
        color:#000
    }
    width:100%;
    height:100%;
    position:relative;
    header{
        height:1.2rem;
        position:relative;
        background:white;
        width:100%;
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
            right:2.2rem;
            top:0;
            width:3.5rem;
            font-size:0.45rem;
            line-height:1.2rem;
            text-indent:1.1rem;
        }
        .headerRight{
            line-height:1.2rem;
            position: absolute;
            width:2.5rem;
            height:100%;
            right:0;
            top:0;
            text-indent:1.2rem;
            color:#ff5829;
        }
    }
}
.logoutButton{
    width:90%;
    height:1rem;
    position:absolute;
    left:5%;
    bottom:0.7rem;
    border:none;
    outline:none;
    background:#fe5722;
    font-size:0.3rem;
    color:white;
    border-radius:0.15rem;
}
.basicInfo{
    margin-top:0.25rem;
    border-top:0.01rem solid #d5d5d5;
    border-bottom:0.01rem solid #d5d5d5;
    height:3.6rem;
    background:white;
    li{
        position:relative;
        font-size:0.32rem;
        height:0.8rem;
        width:90%;
        margin-left:5%;
        list-style:none;
        line-height:0.8rem;
        border-top:0.01rem solid #d5d5d5;
        box-sizing: border-box;
        .iconfont{
            margin-right:0.2rem;
            font-size:0.36rem;
            line-height:0.8rem;
        }
        .icon-more{
            position:absolute;
            right:0;
        }
        span{
            position:absolute;
            right:0.6rem;
            font-size:0.3rem;
            color:#fe5722;
        }
    }
    li:nth-child(1){
        height:1.2rem;
        border-top:none;
        line-height:1.2rem;
        .iconfont{
            line-height:1.2rem;
        }
        span{
            .iconfont{
                font-size:0.8rem;
                position:absolute;
                right:-0.2rem;
                color:#dbdbdb;
            }
        }
    }
}
.settingInfo{
    margin-top:0.25rem;
    border-top:0.01rem solid #d5d5d5;
    border-bottom:0.01rem solid #d5d5d5;
    height:3.6rem;
    background:white;
    li{
         position:relative;
        font-size:0.32rem;
        height:0.8rem;
        width:90%;
        margin-left:5%;
        list-style:none;
        line-height:0.8rem;
        border-top:0.01rem solid #d5d5d5;
        box-sizing: border-box;
        .iconfont{
            margin-right:0.2rem;
            font-size:0.36rem;
            line-height:0.8rem;
        }
        span{
            position:absolute;
            right:0.6rem;
            font-size:0.3rem;
            color:#fe5722;
        }
    }
    li:nth-child(1){
        height:1.2rem;
        border-top:none;
        line-height:1.2rem;
        color:#787878;
    }
}
.sexDiv{
    width: 100%;
    height: 100%;
    background: #234566;
    opacity:.4;
    position:absolute;
    z-index:3;
    top:0
}
.mt-radio{
    width: 90%;
    // height: 40%;
    position:absolute;
    z-index:4;
    top:4rem;
    left:5%;
}

.mint-radiolist{
    background: #fff;
}
</style>