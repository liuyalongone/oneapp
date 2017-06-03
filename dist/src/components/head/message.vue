<template>
    <div class="message_page">
        <h3 class="city_title">
            <router-link class="city_back iconfont icon-back" to="/home" tag="i"></router-link>
            消息
        </h3>
        <ul class="message_list">
            <router-link to="/message/allmessage" tag="li" active-class="active">全部消息</router-link>
            <router-link to="/message/activehub" tag="li" active-class="active">活动中心</router-link>
            <router-link to="/message/systemalert" tag="li" active-class="active">系统提醒</router-link>
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
    .message_page{
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
        .message_list{
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