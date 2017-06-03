<template>
  <div id="app">



      <!-- 路由容器 -->
       <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view class="content"></router-view>
  </div>
</template>

<script>
// import "./assets/iconfont/iconfont.css";

// 引入自己的插件
import Vue from "vue";
import footer from "./components/footer.vue";
Vue.component("one-footer",footer); // 创建了一个全局组件

export default {
  name: 'app',
  data () {
    return {
        isShow:false //控制是否显示nav导航条
    }
  },

  components:{

  }
}
</script>

<style lang="scss">

    *{
      margin:0px;
      padding:0px;
    }

    html,body{
      width: 100%;
      height: 100%;
      font-size:.32em;
    }
    #app{
      display:flex;
      height: 92%;
      background: #eee;
      .content{
        width: 100%;
      }
    }
    footer{
            position: fixed;
            height:.8rem;
            width:100%;
            height: 8%;
            bottom: 0px;
            left:0px;
            background: #fff;
            z-index:2;
            ul {
              display: flex;
              height:100%;
              li {
                flex:1;
                height:100%;
                line-height: 100%;
                text-align: center;
                list-style: none;
                color:#888;
                &.ycActive{
                  color:red
                }
                p{
                    padding:.2rem;
                    font-size:2rem;
                  }
            }

          }
        }
</style>
