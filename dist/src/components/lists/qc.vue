    <template>
         <div>
                <div class="box" v-if="this.faterToSon.show">
                    <div class="top">
                        <div class="left">
                            <li v-for="(data,index) in datalist" @click="hacdelClick(data.ename,index,data.name)" :class="index==currentIndex?'active':''">
                                {{data.name}}
                            <i class="iconfont icon-more"></i></li>
                        </div>
                        <div class="right">
                            <li>100米</li>
                            <li>200米</li>
                            <li>300米</li>
                            <li>400米</li>
                            <li>500米</li>
                            <li>全城</li>
                        </div>
                    </div>
                </div>
          </div>
    </template>


    <script >
        export default{
             mounted(){
                this.datalist = this.faterToSon.data.city.data;
                this.guodu_list = this.faterToSon.data.city.sub;
                 console.log(this.datalist);
            },
            data () {
               return {
                datalist:[],  //一级菜单数据
                guodu_list:[],
                erji_list:[],//二级菜单数据
                currentIndex:0,
                // back_data:"",   //传给父组件的数据
               }
            },
            methods:{
                hacdelClick(data,index,name){
                    console.log(name);
                    this.currentIndex=index;
                    this.$emit("showTofa",false);
                    this.$emit("cityTofa",{data:data,name:name});
                }
            },
            props:["faterToSon"]
        }
    </script>


    <style lang="scss" scoped>
    li{
        list-style:none;
         line-height: 0.72rem;
    }
    .top{
        height: 8rem;
        overflow-y:hidden;
    }
        .left{
            float:left;
            width:50%;
            text-align:center;
            height: 8rem;
            overflow:auto;
            i{
                float:right;
                padding-right:.5rem;
            }
        }
        .right{
            float:left;
            width:50%;
            height: 8rem;
            background: #eee;
            overflow:auto;
            text-align:center;
        }
        .active{
            color:#F64744;
        }
    </style>