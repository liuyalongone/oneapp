<template>
    <div class="userinfoUsernameBox">
        <diy-header>修改用户名</diy-header>
        <section class="modifyUsernameBox">
            用户名<input type="text" class="modifyInput" @input="handleModify($event)" :placeholder="this.$store.state.username">
            <i class="iconfont icon-close"></i>
            <!-- {{this.username}} -->
        </section>
    </div>
</template>


<script >
import diyHeader from "./userinfoHeader.vue";
import "../../assets/iconfont/iconfont.css";

export default{
    data(){
        return{
            modifyUsername:"",
            username:""
        }
    },
    mounted(){
        // console.log(this.$store.state.username) //拿到状态数据
    },
    methods:{
        handleModify(ev){
            this.$store.dispatch("SAVE_USERNAME",ev.target.value);
        }
    },
    components:{
        "diy-header":diyHeader
    }
}
</script>


<style lang="scss" scoped>
.userinfoUsernameBox{
    width:100%;
    height:100;
    span{
        float:right;
    }
}
.modifyUsernameBox{
    width:100%;
    height:1rem;
    background:white;
    margin-top:0.25rem;
    padding:0.1rem;
    .modifyInput{
        height:100%;
        width:70%;
        font-size:0.35rem;
        margin-left:0.3rem;
        border:none;
        outline:none;
        color:gray;
    }
    i{
        margin-left:0.1rem;
        border:0.01rem solid #dbdbdb;
        border-radius:50%;
        background:#dbdbdb;
        padding:0.04rem;
        font-size:0.25rem;
        color:white;
    }
}
</style>;