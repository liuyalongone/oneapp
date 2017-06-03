<template>
    <div class="loginBox">
        <header>
            <div class="headerLeft">
                <i class="iconfont icon-back" @click="handleBackToAbout"></i>
            </div>
            <div class="headerTitle">
                登录
            </div>
            <div class="headerRight" @click="handleRegister">
                注册
            </div>
        </header>
        <section class="loginInputBox">
            <div class="loginUsernameBox">
                账号<input type="text" ref="loginPhoneNum" placeholder="手机号/用户名" autocomplete="off">
            </div>
            <div class="loginPasswordBox">
                密码<input type="password" ref="loginPassword" placeholder="6~23位字母数字组合" autocomplete="off">
            </div>
        </section>
        <button class="loginButton" @click="goLogin">登录</button>
        <section class="loginButtonTag">
            <span class="lbt1">找回密码</span>
            <span class="lbt2">手机号快捷登录</span>
        </section>
        <section class="loginBottomBox">
            <p>使用第三方账号登录</p>
            <i class="iconfont icon-atmaway"></i>
        </section>
    </div>
</template>


<script >
import Api from "../api";
import "../assets/iconfont/iconfont.css";
import router from "../router";
import axios from "axios";
import { Toast } from 'mint-ui';
export default{
    data(){
        return{

        }
    },
    methods:{
        handleRegister(){
            router.push("/register")
        },
        handleBackToAbout(){
            router.go(-1);
        },
        goLogin(){
            axios.post(Api.interface+'/api/login', {
                loginPhoneNum: this.$refs.loginPhoneNum.value,
                loginPassword: this.$refs.loginPassword.value
            })
            .then(function (res) {
                if(res.data[0] ==false){
                    console.log("登陆失败")
                    Toast({
                      message: '用户名或密码错误',
                      position: 'bottom',
                      duration: 2000
                    });
                }else{
                    Toast({
                      message: '登陆成功！',
                      position: 'middle',
                      duration: 2000
                    });
                    router.push("/about");
                    localStorage.setItem("userPhone",res.data[1]);
                    localStorage.setItem("userName",res.data[1]);
                    localStorage.setItem("isShow",res.data[0]);
                }

            })
            .catch(function (res) {
                console.log(res);
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.loginBox{
    width:100%;
}
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
        right:2rem;
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
.loginInputBox{
    height:2rem;
    margin-top:0.25rem;
    background:white;
    border-top:0.01rem solid #eaeaea;
    border-bottom:0.01rem solid #eaeaea;
    input{
        width:80%;
        height:100%;
        outline:none;
        border:none;
        margin-left:0.3rem;
        line-height:100%;
        font-size:0.3rem;
    }
    .loginUsernameBox{
        margin-left:0.2rem;
        height:50%;
        border-bottom:0.01rem solid #eaeaea;
    }
    .loginPasswordBox{
        height:50%;
        margin-left:0.2rem;

    }
}
.loginButton{
    width:85%;
    height:0.9rem;
    background:#fe5722;
    border-radius:0.15rem;
    border:none;
    outline:none;
    color:white;
    font-size:0.3rem;
    margin:0.3rem 0 0 7.5%;
}
.loginButtonTag{
    width:85%;
    margin:0.3rem 0 0 7.5%;
    overflow:hidden;
    color:#dc542a;
    .lbt1{
        float:left;
    }
    .lbt2{
        float:right;
    }
}
.loginBottomBox{
    height:1.8rem;
    position:absolute;
    bottom:8.3%;
    width:90%;
    left:5%;
    border-top:0.01rem solid #d5d5d5;
    p{
        position:absolute;
        width:48%;
        left:26%;
        text-align:center;
        top:-0.2rem;
        background:#f0f0f0;
        font-family:"黑体";
        font-size:0.32rem;
    }
    i{
        position:absolute;
        top:.5rem;
        font-size:.7rem;
        left:45%;
        color:#50ade8;
    }
}
</style>