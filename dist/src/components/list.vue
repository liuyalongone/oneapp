    <template>
        <div id="list">
            <div class="fixed">
                <header class="listheader">
                    <ul class="hea_top">
                        <router-link tag="li" active-class="Aactive" to="/list/all">全部商家</router-link>
                        <router-link tag="li" active-class="Aactive" to="/list/vip">VIP商家</router-link>
                    </ul>
                </header>
                <nav>
                    <ul class="nav_ul">
                        <li  v-for="(data,index) in navlist" @click="handleClick(data.address,index,isShow)"
         :class="currentIndex==index?'active':''" :key="index" class="no_border">
                            {{data.name}}
                            <i :class="currentIndex==index?'iconfont icon-less':'iconfont icon-moreunfold'"></i>
                        </li>
                    </ul>
                </nav>

                 <keep-alive>
                        <component v-bind:is="currentView" :faterToSon="{show:isShow,data:datalist}"
                            @sonTofa="SonTofa" @showTofa="showTofa" @cityTofa="cityTofa"
                            @sortTofa="sortTofa" @shjiaTofa="shjiaTofa">
                                                                    <!-- 父组件传给子组件 -->
                                                                    <!-- sortTofa排序子传父 -->
                                                                    <!-- cityTofa 城市子传父 -->
                                                                    <!--sonTofa 全部分类子传父 -->
                          <!-- 组件在 vm.currentview 变化时改变！ -->
                        </component>
                </keep-alive>
            </div>

                                        <!--all 子路由的容器 -->
            <router-view class="center" :toSonluyou="cate"></router-view>
                                        <!-- 父路由传给子路由 -->
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
    import Api from "../api";
    import { Indicator } from 'mint-ui';
    import router from "../router";
    import "../assets/iconfont/iconfont.css";
    import qb from "./lists/qb.vue";
    import qc from "./lists/qc.vue";
    import zn from "./lists/zn.vue";
    import tg from "./lists/tg.vue";
        export default{
            mounted(){
                Indicator.open();
                axios.get(Api.interface+"/api/list",{
                }).then(res=>{
                    console.log(res.data.data);
                    this.datalist = res.data.data;
                    Indicator.close();
                })

            },
            data () {
               return {
                    isShow:false, //控制是否显示nav导航条
                    navlist:[
                        {name:"全部分类",address:"qb"},
                        {name:"全城",address:"qc"},
                        {name:"智能排序",address:"zn"},
                        {name:"团购商家",address:"tg"}],
                    datalist:[],//后台传输的数据
                    currentIndex:0,
                    currentView:"",
                    cate:"all",  //要传给子路由的数据
                    city:"all",
                    listorder:0
               }
            },
            methods:{
                handleClick(data,index){
                    this.isShow = !this.isShow;
                    this.currentView = data;
                    this.currentIndex = index;
                },
                // 获取子组件传来的地址数据
                SonTofa(value){
                    // console.log(value);
                    this.cate = value.data;
                    this.navlist[0].name = value.name;
                    router.push({ path: '/list/all/', query: { cate: `${value.data}`,city:this.city,listorder:this.listorder}})
                },
                showTofa(){    //点击选项，隐藏列表页面
                    this.isShow = false;
                },
                //
                cityTofa(value){
                    this.city = value.data;
                    this.navlist[1].name = value.name;
                    router.push({ path: '/list/all/', query: { city: `${value.data}`,cate:this.cate,listorder:this.listorder}})
                },
                sortTofa(value){
                    this.listorder = value.sort;
                    this.navlist[2].name = value.name;
                    router.push({ path: '/list/all/', query: { listorder: `${value.sort}`,cate:this.cate,city:this.city}})
                },
                shjiaTofa(value){
                    this.listorder = value.sort;
                    this.navlist[3].name = value.name;
                    router.push({ path: '/list/all/', query: { listorder: `${value.sort}`,cate:this.cate,city:this.city}})
                }
            },
            components:{
                "qb":qb,
                "qc":qc,
                "zn":zn,
                "tg":tg
            }
        }
    </script>

    <style lang="scss" scoped>
    #list{
        width: 100%;
         background: #fff;
    }
    .fixed{
        position:fixed;
        top:0px;
        width: 100%;
        background: #fff;
        z-index:2;
    }
        .listheader{
            padding:.2rem;
            .hea_top{
                width:60%;
                margin:0 auto;
                display: flex;
                border:1px solid #F64744;
                border-radius:.1rem;
                li{
                    flex:1;
                    list-style: none;
                    line-height: 0.64rem;
                    height: 0.64rem;
                    text-align: center;
                    color:#F64744;
                    &.Aactive{
                        background: #F64744;
                        color:#fff;
                    }
                }
            }
        }
        .nav_ul{
            display:flex;
            li{
                flex:1;
                list-style: none;
                line-height: 0.64rem;
                height: 0.64rem;
                text-align: center;
                color:#333;
                border-top:1px solid #ddd;
                border-bottom:1px solid #ddd;
                border-left:1px solid #ddd;
                font-size:.28rem;
                &.active{
                    color:#F64744;
                }
                &:nth-of-type(1){
                    border-left:0;
                }
            }
        }
    .center{
        padding-top:1.8rem;
    }

    </style>