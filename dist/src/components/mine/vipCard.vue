<template>
    <div class="choose_city">
        <h3 class="city_title">
            <router-link class="city_back iconfont icon-back" to="/about" tag="i"></router-link>
            我的会员卡
        </h3>
    </div>
</template>

<script>

export default {
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .choose_city{
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
    }
</style>