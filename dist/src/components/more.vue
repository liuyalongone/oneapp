    <template>
         <div id="more">
            <div class="top">
                <div class="two">
                    <p>新消息提醒<mt-switch class="right">开关</mt-switch></p>
                    <p>仅wifi下显示图片<mt-switch  class="right">开关</mt-switch></p>
                </div>
                 <div class="two">
                    <p>关于我们<b class="iconfont icon-more"></b></p>
                    <p>联系客服<b class="iconfont icon-more" @click="callPhon"></b><span>0573-88888888</span></p>
                </div>
                <p>检查更新 <b class="iconfont icon-more"></b><span>已是最新版本</span></p>
                <div class="clear">清除缓存（2.93MB）</div>
            </div>
            <one-footer>
                <ul class="navlist" >
                  <!-- router-link 支持tag 标签  -->
                  <router-link active-class="ycActive" tag="li" to="/home"><p class="iconfont icon-viewlist"></p>首页</router-link >
                  <router-link active-class="ycActive" tag="li" to="/list"><p class="iconfont icon-store"></p>商家</router-link >
                  <router-link active-class="ycActive" tag="li" to="/about"><p class="iconfont icon-bussinessman"></p>我的</router-link >
                  <router-link active-class="ycActive" tag="li" to="/more"><p class="iconfont icon-navlist"></p>更多</router-link >
                </ul>
            </one-footer>
        </div>
    </template>


    <script >
    import "../assets/iconfont/iconfont.css";
    import Vue from 'vue';
    import { Switch } from 'mint-ui';
    Vue.component(Switch.name, Switch);
        export default{
            methods:{
                callPhon(){
                    plus.device.dial( "0573-88888888", false );
                }

            }
        }

    </script>


    <style lang="scss" scoped>
    #more{
        width: 100%;
    }
    .top{
          .two{
            margin:.3rem 0;
        }
        p{
            background: #fff;
            border:1px solid #ccc;
            line-height:1rem;
        }
        .right{
            float:right;
        }
        b{
            float:right;
            padding-right:.2rem;
            color:#aaa;
        }
        .clear{
            margin:.5rem;
            line-height:1rem;
            text-align:center;
            color:red;
            background: #FFF;
            border-radius:.1rem;
        }
        span{
            float:right;
            color:#aaa;
            font-size:.14rem;
            padding-right:.2rem;
        }
    }

    </style>