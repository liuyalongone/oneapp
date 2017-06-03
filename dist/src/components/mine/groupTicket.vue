<template>
    <div class="groupTicket">
        <h3 class="groupTicket_title">
            <router-link class="groupTicket_back iconfont icon-back" to="/about" tag="i"></router-link>
            团购券
        </h3>
        <ul class="group_list">
            <router-link to="/groupticket/canuse" tag="li" active-class="active">可使用</router-link>
            <router-link to="/groupticket/validate" tag="li" active-class="active">已验证</router-link>
            <router-link to="/groupticket/overdue" tag="li" active-class="active">已过期</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .groupTicket{
        width:100%;
        height:100%;
        background:#f0f0f0;
        i{
            font-size:0.6rem;
            font-style:normal;
            color:#ff5722;
            font-weight: 900;
            position:absolute;
            top:0.05rem;
            left:0.1rem;
        }
        h3{
            font-weight: normal;
            height:1rem;
            text-align: center;
            line-height: 1rem;
            font-size:0.4rem;
            position:relative;
            border-bottom:1px solid #ccc;
            background: white;
        }
        .group_list{
            width:100%;
            height:1.2rem;
            li{
                float:left;
                width:2.5rem;
                list-style:none;
                font-size:0.36rem;
                height:100%;
                line-height: 1.2rem;
                border-bottom:4px solid #d7d7d7;
                text-align: center;
                background:white;
                &.active{
                    color:#ff5722;
                    border-bottom:4px solid #ff5722;
                }
            }

        }

    }
</style>