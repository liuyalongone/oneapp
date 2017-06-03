    <template>
         <div>

            <section>
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                <ul
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10"
                >
                    <li v-for="data in datalist" @click="handleClick(data.id)">
                        <div class="li_con">
                            <div class="im left">
                                <img :src="data.image_480" alt="">
                            </div>
                            <div class="right">
                                <h4>{{data.store_name}}</h4>
                                <p class="agio">会员享受7.8折优惠</p>

                                <p class="price"><span>{{data.buy_num}}</span><i class="iconfont icon-accountfilling"></i></p>
                            </div>
                        </div>
                    </li>
                    <li class="message">{{message}}</li>
                </ul>
            </mt-loadmore>
            </section>
          </div>
    </template>


    <script >
    import Api from "../api";
    import router from "../router";
    import { Indicator } from 'mint-ui';
    import Vue from 'vue'
        export default{
            mounted(){
                console.log(this.$route.query.k)
                Indicator.open();

                //判断地址栏是否有K值，有的话就是搜索跳转过来的。没有则是组件选择传递过来的。
                if(!this.$route.query.k){
                    axios.get(Api.interface+`/api/shoplist/`,{
                        params:{
                            cate:`${this.$route.query.cate}`,
                            city:`${this.$route.query.city}`,
                            listorder:`${this.$route.query.listorder}`
                        }
                    }).then(res=>{
                        console.log(res);
                        this.datalist = res.data.data;
                        // console.log(this.datalist);
                        Indicator.close();
                    })
                }else{
                    console.log(this.$route.query)

                    axios.get(Api.interface+`/api/search/`,{
                        params:{
                            k:`${this.$route.query.k}`
                        }
                    }).then(res=>{
                        console.log(res);
                        this.datalist = res.data.data;
                        // console.log(this.datalist);
                        Indicator.close();
                    })

                }

            },
            updated(){
                // console.log(111);
                // console.log(this.$store.state.cate)
            },


            data () {
               return {
                    isShow:false, //控制是否显示nav导航条

                    datalist:[],
                    loading:false,
                    allLoaded:false,
                    curpage:1,
                    total:1,
                    message:"加载中...",
                    id:""//后台传输的数据
               }
            },
            methods:{
                handleClick(value){
                    // console.log(value);
                    router.push(`/list/all/${value}`); //es6的字符串模板
                },
                fetchData(){
                    console.log(this.$route.query.cate);
                    this.id =this.$route.query.cate;
                    Indicator.open();
                     axios.get(Api.interface+`/api/shoplist/`,{
                        params:{
                            cate:`${this.$route.query.cate}`,
                            city:`${this.$route.query.city}`,
                            listorder:`${this.$route.query.listorder}`
                        }
                    }).then(res=>{
                        // console.log(res);
                        this.datalist = res.data.data;
                        // console.log(this.datalist);
                        Indicator.close();
                    })
                },
                loadMore(){
                    if(this.curpage>this.total){
                        //所有数据请求完成
                        this.message = "没有更多数据了..."
                        return ;
                    }
                    axios.get(`/api/shoplist?cate=${this.$route.params.id}`,{
                        params:{
                            page:this.curpage++
                        }
                    }).then(res=>{
                        // console.log(res.data);
                        // this.datalist = res.data.data;
                        //数组解构
                        this.datalist = [...this.datalist,...res.data.data];

                        this.loading = false;
                        //防止数据多次加载
                        this.total = 5;
                        // console.log(this.datalist);
                    })
                },
                loadTop() {
                  // ...// 加载更多数据
                  this.$refs.loadmore.onTopLoaded();
                },
                loadBottom() {
                  // ...// 加载更多数据
                  this.allLoaded = true;// 若数据已全部获取完毕
                  this.$refs.loadmore.onBottomLoaded();
                }

            },
                //http://m.1c10.cn/list.html?city=all&cate=all&ajax=1&curpage=2
            watch:{
                "$route.query":'fetchData',
            }
        }
    </script>


    <style lang="scss" scoped>
        *{
            padding:0;
            margin:0;
        }
        section{
            width: 100%;
        li{
            height:1.5rem;
            padding:.2rem;
            border-bottom:1px solid #ccc;
            overflow:hidden;
            .left{
                float:left;
                width: 2.4rem;
                height:1.6rem;
                padding-right:.2rem;
                img{
                    width:100%;
                }

            }
            .right{
                // float:left;
                .agio{
                    font-size:.1rem;
                }
                .price{
                    padding-top:.3rem;
                    span{
                        float:right;
                        font-size:.2rem;
                        color:#aaa;
                    }
                    i{
                        float:right;
                        color:#aaa
                    }
                }
            }
        }
    }
    .message{
        text-align:center;
    }
    </style>