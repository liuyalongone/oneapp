    <template>
        <div class="flex">
            <header>
                <div class="logo"></div>
                <div class="login" @click="handleLogin">{{isShow?userPhone:"点击登录"}}</div>
            </header>
            <nav>
               <router-link :to="this.toSon[0]" tag="div" class="no-border">
                    <p class="iconfont icon-component"></p>团购券</router-link>
                <router-link :to="this.toSon[1]" tag="div">
                    <p class="iconfont icon-emailfilling"></p>会员卡</router-link>
                <router-link :to="this.toSon[2]" tag="div">
                    <p class="iconfont icon-trade"></p>钱包</router-link>
            </nav>
            <section>
                <router-link tag="p" class="list" :to="this.toSon[3]"><i class="iconfont icon-rejectedorder"></i> <b class="iconfont icon-more"></b>买单订单</router-link>
                <router-link tag="p" class="list" :to="this.toSon[4]"><i class="iconfont icon-favorite"></i> <b class="iconfont icon-more"></b>我的收藏</router-link>
                <router-link tag="p" class="list" to="/currentbrowse"><i class="iconfont icon-success"></i> <b class="iconfont icon-more"></b>最近浏览</router-link>
                <router-link tag="p" class="list margin" :to="this.toSon[5]"><i class="iconfont icon-hot"></i> <b class="iconfont icon-more"></b>今日推荐</router-link>
            </section>
                <p class="listshop" @click="notShop"><i class="iconfont icon-box"></i> <b class="iconfont icon-more"></b>我是商家</p>
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
    import router from "../router";
    import { Toast } from 'mint-ui';
    export default{
            mounted(){

                axios.get(`/api/logined`,{
                    }).then(res=>{
                        console.log(res.data);

                })

                this.$store.dispatch("SAVE_USERNAME",this.userPhone);
                if(!localStorage.getItem("userName")){
                    this.toSon = ["/login","/login","/login","/login","/login","/login"]
                }else{
                    this.toSon = ["/groupticket","/vipcard","/wallet","/orderform","/collect","/recommend"]
                }
            },
            data () {
               return {
                    isShow:JSON.parse(localStorage.getItem("isShow")),
                    datalist:[],//后台传输的数据
                    userPhone:localStorage.getItem("userName"),
                    toSon:["/groupticket","/vipcard","/wallet","/orderform","/collect","/recommend"],
                    user:""

               }
            },
            methods:{
                handleLogin(){
                    if(this.isShow){
                        router.push("/userinfo");
                    }else{
                        router.push("/login");
                    }
                },
                notShop(){
                    Toast({
                      message: '您不是商家',
                      position: 'bottom',
                      duration: 2000
                    });
                }
            },
            computed:{
                judgeIsShow(){
                    if(this.userPhone.length>0){

                        return true
                    }
                }
            }
        }

    </script>


    <style lang="scss" scoped>
    .flex{
        width: 100%;
    }
        header{

            background: #F64744;
            height:2rem;
            .logo{
                border-radius:50%;
                width: 1rem;
                height: 1rem;
                margin:.5rem;
                background: #eee;
                float:left;
            }
            .login{
                float:left;
                margin-top:.7rem;
                font-size:.4rem;
                color:white;

            }
        }
        nav{
             font-size:0.35rem;
            display:flex;
            border-bottom:1px solid #ccc;
            background: #fff;
            div{
                margin:.3rem 0;
                width: 33%;
                height: 1rem;
                text-align:center;
                border-left:1px solid #ccc
            }
            .no-border{
                border:0;
            }
            p{
                font-size:.5rem;

            }
        }
        section{
            background: #eee;
            padding:.3rem 0;
            height: 8rem;
        }
        .list{
            font-size:0.35rem;
            padding:.2rem;
            background: #fff;
            i{
                padding:0 .2rem;
            }
            b{float:right;
                padding-right:.2rem;
            }
        }
        .margin{
            margin:.2rem 0;
        }
        .listshop{
            width: 100%;
            position:absolute;
            z-index:4;
            top:7.8rem;
            font-size:0.35rem;
            padding:.2rem;
            background: #fff;
            i{
                padding:0 .2rem;
            }
            b{float:right;
                padding-right:.6rem;
            }
        }
    </style>