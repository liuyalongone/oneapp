
<template>
    <div class="choose_city">
        <h3 class="city_title">
            <router-link class="city_back iconfont icon-back" to="/home" tag="i"></router-link>
            选择城市
        </h3>
        <ul class="choose_ul">
            <li class="now">当前：桐乡</li>
            <li class="now_liosition">当前定位城市</li>
            <li class="not_in">不在下面的城市中</li>
            <li class="J">J</li>
            <li class="嘉兴">嘉兴</li>
            <li class="T">T</li>
            <li class="桐乡">桐乡</li>
        </ul>
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
        .choose_ul{
            li{
                padding:0.1rem 0.2rem;
                list-style:none;
                font-size:0.32rem;
                height:0.64rem;
                line-height:0.64rem;
                &:nth-child(2n+1){
                    background:white;
                }
            }

        }

    }
</style>