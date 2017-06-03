<template>
    <div class="currentbrowse">
        <h3 class="current_title">
            <router-link class="current_back iconfont icon-back" to="/about" tag="i"></router-link>
            最近浏览
        </h3>

        <ul v-for="(objdata, ulIndex) in forUl">
            <!-- 判断时间 -->
            <p class="time">{{objdata==today?"今天":objdata}}</p>
            <li v-for="data in forLi[ulIndex]" @click="handleClick(data.id)">
                <img :src="data.image_240" class="currentbrowse_img">
                <div class="currentbrowse_right">
                    <h4>
                        {{data.store_name}}
                    </h4>
                    <p>
                        <span>{{data.city_name}}</span>
                        {{data.subtitle}}
                    </p>
                    <div class="calc">
                        <span>￥{{data.price}}</span>
                        <i class="through">￥{{data.origin_price}}</i>
                        <b>下载:{{data.buy_num}}</b>
                    </div>
                </div>
            </li>
        </ul>
        <!-- <li>{{loadWhat}}</li> -->

    </div>
</template>

<script>
import router from "../../router"
export default {
    data(){
        return{
            datalist:[],
            loadWhat:"",
            time:"",
            forUl:[],//定义一个空数组接受Ul需要遍历的数据
            forLi:[],//定义一个空数组，为了接受li要遍历的值
            today:""//定义一个空值，接收今天的时间，是否跟取出来的相同
        }
    },
    methods:{
        handleClick(id){
            router.push(`/detail/${id}`);
        }
    },
    mounted(){
        //判断取出来的时间是否跟现在的时间相同
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth();
        var date = time.getDate();
        this.today = year + "-" + month + "-" + date;
        console.log(this.today)
        //从localStorage中取出数组
        this.datalist = Array.from(JSON.parse(window.localStorage.getItem("data")))
        //定义一个数组
        var voidArr = [];
        //datalist中有数据才执行
        if(this.datalist.length > 0){
            //循环把每一个对象中的时间放到一个数组中
            for (var j = 0; j < this.datalist.length ; j++){
                voidArr.unshift(this.datalist[j].computedTime);
                //数组去重
                var newArr = Array.from(new Set(voidArr));
            }
            //定义一个最外层的大对象
            var obj = {};
            //遍历这个已经去重的数组，把数组中的每一个数据都添加到obj这个对象的属性中
            for(var i = 0; i < newArr.length; i++){
                obj[newArr[i]] = [];
                // console.log(obj);
                // console.log(newArr)
            }
            //第一层循环遍历这个大对象的每一个属性名，第二层循环遍历this.datalist，如果datalist[k].computedTime == 对象中的属性名
            //就向这个对象的值（就是这个空数组）push这个datalist[k]
            for(var a in obj){
                for(var b = 0; b < this.datalist.length; b++){
                    if(this.datalist[b].computedTime == a){
                        obj[a].unshift(this.datalist[b]);
                    }
                }
            }
            console.log(obj)
    /*1、定义一个空数组，每次循环datalist，把每个对象的时间取出来，然后Push到数组中；
    2、将数组去重
    3、定义一个最外层的大对象
    4、遍历这个数组，给对象添加上属性，属性名是对象的时间值，属性值是一个空数组
    5、两层循环将时间相同的对象存到该时间对象的数组中
    */
    /*1、定义一个数组放obj的属性名，为ul的遍历准备,定义一个null,放每个属性值
    2、在ul中和li中遍历
    */
            for (var c in obj){
                this.forUl.unshift(c)
            }
            //for in 循环把每一个key值也就是每个对象后面的数组都放到一个大数组中
            for (var d in obj){
                this.forLi.unshift(obj[d]);
            }
            console.log(this.forLi)
        }
    }
}
</script>

<style lang="scss" scoped>
    .currentbrowse{
        width:100%;
        height:100%;
        background:#f0f0f0;
        .icon-back{
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

        ul{
            background:white;
            .time{
                height:0.7rem;
                line-height: 0.7rem;
                margin-left:0.2rem;
            }
            li{
                list-style:none;
                border-top:1px solid #d7d7d7;
                height:1.62rem;
                padding:0.2rem 0.16rem;;
                &:after{
                    content:"";
                    display: block;
                    clear:both;
                }

                img{
                    width:2.36rem;
                    float:left;
                }
                .currentbrowse_right{
                    float:right;
                    h4{
                        line-height: 0.32rem;
                        font-size:0.32rem;
                        color:#1a1a1a;
                        padding-bottom:0.05rem;
                        overflow:hidden;
                        font-weight:normal;
                    }
                    p{
                        white-wrap:wrap;
                        width:4.62rem;
                        font-size:0.24rem;
                        height:0.64rem;
                        color:#a3a3a3;
                        overflow: hidden;
                    }
                    .calc{
                        padding-top:15px;
                        font-size:0.24rem;
                        line-height: 0.24rem;
                        color:#9b9b9b;
                        &:after{
                            content:"";
                            clear:both;
                            display: block;
                        }
                        span{
                            color:#ff5722;
                            font-size:0.42rem;
                            font-weight: 700;
                            float:left;
                        }
                        .through{
                            font-style:normal;
                            float:left;
                            margin-left:0.35rem;
                            text-decoration: line-through;
                        }
                        b{
                            float:right;
                            font-weight: normal;
                            font-size:0.3rem;
                        }
                    }
                }
            }
        }

    }
</style>