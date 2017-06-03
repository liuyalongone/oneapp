<template>
    <div class="sub_search">
        <div class="search_header">
            <router-link to="/home" tag="i" class="iconfont icon-back search_back"></router-link>
            <div class="search_center">
                <i class="iconfont icon-search search_icon"></i>
                <input type="text" placeholder="商家、品类、商圈" class="search_inp" v-model="inp_value" @input="change()">
                <span class="iconfont icon-close" :style={display:isShow} @click="clear"></span>
            </div>
            <span class="search_right" @click="searchClick(inp_value)">搜索</span>
        </div>
        <!-- 放搜索下拉框 -->
        <ul class="forUl" v-show="ulShow">
            <li v-for="search_data in search" @click="pullClick(search_data)">
                <i class="iconfont icon-search pull"></i>
                <span>{{search_data}}</span>
                <b class="iconfont icon-more right"></b>
            </li>
        </ul>
        <h3 class="search_hot">热门搜索</h3>
        <div class="search_shop">
            <span v-for="(data,index) in datalist" :style="{background:data.color}" @click="hotClick(data.name)">{{data.name}}</span>
        </div>
    </div>
</template>

<script>
import router from "../../router"
import Api from "../../api";
export default {

    data(){
        return{
            datalist:[],
            inp_value:'',
            isShow:"none",
            search:[],//定义一个空数组放从后端传过来的数组
            ulShow:false
        }
    },
    mounted(){
        axios.get(Api.interface+"/javascripts/search.json").then(res=>{
            this.datalist = res.data;
        })
    },
    updated(){
        if(this.inp_value.length == 0){

            this.isShow = "none"
        }else{
            this.isShow = "block"
        }

        if(this.search.length == 0){
            this.ulShow = false
        }else{
            this.ulShow = true
        }
    },
    methods:{
        searchClick(data){
            var font = encodeURIComponent(data);
            router.push(`/list/all?u=1&k=${font}`)
            this.$store.dispatch("SAVE_SEARCH",font);
        },
        clear(){
            // this.ulShow = false
            console.log(this.ulShow);
            this.inp_value = "";
            this.search=[];
        },
        hotClick(trans_data){
            this.inp_value = trans_data;
            this.searchClick(trans_data);
        },
       change(){
            //当每次输入框中的值改变的时候都会向后台发起一次请求
            //并且当输入框中的值布为空的时候执行
            if(this.inp_value){
                axios.get(Api.interface+`/api/websearch`,{
                    params:{
                        shopName:this.inp_value
                    }
                }).then(res=>{
                    this.search = res.data;
                })
            }

        },
        //点击下拉框跳转页面，跳转路由
        pullClick(serch_value){
            var afterUri = encodeURIComponent(serch_value);
            router.push(`/list/all?u=1&k=${afterUri}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.sub_search{
        width:100%;
        height:100%;
        .search_header{
            height:0.8rem;
            border-bottom:2px solid #d7d7d7;
            .search_back{
                font-size:0.6rem;
                font-style:normal;
                color:#ff5722;
                font-weight: 900;
                margin-left:0.1rem;
                margin-top:0.1rem;
                float:left;
            }
            .search_center{
                float:left;
                margin-left:1rem;
                margin-top:0.15rem;
                position:relative;
                .search_icon{
                    position:absolute;
                    top:0.1rem;
                    left:0.17rem;
                    color:#fe6332;
                }
                .search_inp{
                    width:4rem;
                    height:0.5rem;
                    border-radius:0.25rem;
                    border:none;
                    outline:none;
                    text-indent:0.8rem;
                    background:#f0f0f0;
                    &:focus{
                        color:#F00;
                    }
                }
                .icon-close{
                    position:absolute;
                    top:0.1rem;
                    right:0.1rem;
                    color:red;
                    font-weight:900;
                }
            }
            .search_right{
                float:right;
                margin-top:0.2rem;
                font-size:0.3rem;
                margin-right:0.3rem;
                color:#ff5722;
            }
        }
// 写下拉输入框的样式
            .forUl{
                position:absolute;
                top:0.8rem;
                z-index:3;
                width:100%;
                height:80%;
                background: #fff;
                li{
                    height:0.8rem;
                    line-height: 0.8rem;
                    border-bottom:0.01rem solid #999;
                    .pull{
                        float:left;
                        color:#f00;
                        margin-left:0.2rem;
                        font-weight: 900;
                    }
                    span{
                        float:left;
                        margin-left:0.3rem;
                    }
                    .right{
                        float:right;
                    }
                }
            }

        .search_hot{
            margin-left:0.2rem;
            height:0.8rem;
            line-height:0.8rem;
            font-size:0.4rem;
            font-weight: 500;
        }
        .search_shop{
            margin-left:0.2rem;
            position:relative;
            z-index:2;
            span{
                display: inline-block;
                font-size:0.34rem;
                margin-right:0.3rem;
                margin-bottom: 0.15rem;
                height:0.64rem;
                border-radius:0.3rem;
                padding-right:0.3rem;
                padding-left:0.3rem;
                color:#fff;
                line-height: 0.64rem;
                font-family: "微软雅黑";
                font-weight: normal;
            }
        }
    }
</style>