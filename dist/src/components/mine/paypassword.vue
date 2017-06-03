
<template>
    <form class="input_code" action="">
        <h3 class="input_title">
            <router-link class="input_back iconfont icon-back" to="/wallet" tag="i"></router-link>
            输入验证码
            <input type="submit" value="确认" class="ok">
        </h3>
        <div class="identifying">
            <span>验证码</span>
            <input type="text" placeholder="请输入验证码" class="please">
        </div>
    </form>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
    .input_code{
        width:100%;
        height:100%;
        background:#f0f0f0;

        h3{
            font-weight: normal;
            height:0.8rem;
            text-align: center;
            line-height: 0.8rem;
            font-size:0.4rem;
            position:relative;
            border-bottom:1px solid #ccc;
            background: white;
            i{
                font-size:0.6rem;
                font-style:normal;
                color:#f00;
                font-weight: 900;
                position:absolute;
                top:0.05rem;
                left:0.1rem;
            }
            .ok{
                font-size:0.3rem;
                position:absolute;
                top:0.2rem;
                right:0.2rem;
                color:#ff5722;
                background:transparent;
                border:none;
                outline:none;
            }
        }
        .identifying{
            height:1rem;
            line-height: 1rem;
            font-size:0.4rem;
            display: flex;
            background: #fff;
            padding-left:0.3rem;
            margin-top:0.2rem;
            border-top:2px solid #d7d7d7;
            border-bottom:2px solid #d7d7d7;

            .please{
                margin-left:0.3rem;
                border:none;
                outline:none;
                height:100%;
                flex:1;
                font-size:0.32rem;
                &:focus{
                    color:red;
                }
            }
        }
    }
</style>