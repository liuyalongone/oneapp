<template>
    <div class="userinfoHeaderBox">
        <header>
            <div class="headerLeft">
                <i class="iconfont icon-back" @click="goback"></i>
            </div>
            <div class="headerTitle">
                <slot></slot>
            </div>
            <div class="headerRight" @click="handleBackToUserinfo">
                <span>确认</span>
            </div>
        </header>
    </div>
</template>


<script >
import Api from "../../api";
import router from "../../router";
import "../../assets/iconfont/iconfont.css";
import { Toast } from 'mint-ui';
export default{
    methods:{
        handleBackToUserinfo(){
            localStorage.setItem("userName",this.$store.state.username);
            axios.post(Api.interface+'/api/modify', {
                modifyPhone:localStorage.getItem("userPhone"),
                modifyName: this.$store.state.username,
            })
            .then(function (res) {
                // console.log(res.data[1])
                router.push("/userinfo");
            })
            .catch(function (res) {
                console.log(res);
            })
            Toast({
                      message: '修改成功！',
                      position: 'middle',
                      duration: 2000
                    });

        },
        goback(){
            router.go(-1);
        }
    }
}
</script>


<style lang="scss" scoped>
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
        right:2.5rem;
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
</style>