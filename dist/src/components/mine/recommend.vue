<template>
     <div>
        <div class="header_filx">
            <div class="headerLeft">
                <router-link tag="i" class="iconfont icon-back" to="/about"></router-link>
            </div>
            <div class="headerTitle">
                今日推荐
            </div>
        </div>
      </div>
</template>


<script >
    export default{
        data () {
            return {

            }
        },
        methods:{
            handelClick(){

            }
        }
    }
</script>


<style lang="scss" scoped>
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

</style>