<template>
    <div class="registerBox">
        <header>
            <div class="headerLeft">
                <i class="iconfont icon-back" @click="handleBackToLogin"></i>
            </div>
            <div class="headerTitle">
                注册
            </div>
        </header>
        <section class="registerTelBox">
            <div class="telBox">
                <span>+86</span>
                <input type="text" name="telInput" placeholder="手机号" ref="registerPhoneNum">
                <div class="codeBox">获取验证码</div>
            </div>
        </section>
        <section class="registerInputBox">
            <div class="registerUsernameBox">
                验证码<input type="text" ref="registerUsername" placeholder="请输入验证码" autocomplete="off">
            </div>
            <div class="registerPasswordBox">
                密码<input type="password" ref="registerPassword" placeholder="6~23位字母数字组合" autocomplete="off">
            </div>
        </section>
        <button class="registerButton" @click="goRegister">立即注册</button>

    </div>
</template>


<script >
import Api from "../api";
import "../assets/iconfont/iconfont.css";
import router from "../router";
import axios from "axios";
import { Toast } from 'mint-ui';
export default{
    mounted(){

    },
    data(){
        return{

        }
    },
    methods:{
        handleBackToLogin(){
            router.push("/login")
        },
        goRegister(){
            axios.post(Api.interface+'/api/register', {
                registerPhoneNum: this.$refs.registerPhoneNum.value,
                registerPassword: this.$refs.registerPassword.value
            })
            .then(function (res) {
                Toast({
                  message: '注册成功！',
                  position: 'middle',
                  duration: 1000
                });
                router.push("/login");
            })
            .catch(function (res) {
                console.log(res);
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.registerBox{
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
.registerTelBox{
    margin-top:0.25rem;
    background:white;
    height:1.2rem;
    .telBox{
        margin-left:0.2rem;
        height:80%;
        position:relative;
        span{
            display:inline-block;
            height:1rem;
            width:1rem;
            margin-top:0.1rem;
            font-size:0.4rem;
            line-height:1rem;
            border-right:0.01rem solid #ececec;
        }
        input{
            width:60%;
            height:100%;
            border:none;
            outline:none;
            font-size:0.3rem;
            margin-left:0.1rem;
        }
        .codeBox{
            width:1.55rem;
            height:0.75rem;
            position:absolute;
            right:0.2rem;
            top:0.25rem;
            text-indent:0.1rem;
            text-align:center;
            border:0.01rem solid #d76435;
            border-radius:0.1rem;
            color:#d76435;
            font-size:0.3rem;
        }
    }
}
.registerInputBox{
    height:2rem;
    background:white;
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
    .registerUsernameBox{
        border-top:0.01rem solid #eaeaea;
        margin-left:0.2rem;
        height:50%;
        border-bottom:0.01rem solid #eaeaea;
    }
    .registerPasswordBox{
        height:50%;
        margin-left:0.2rem;

    }
}
.registerButton{
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

</style>