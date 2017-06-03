    <template>
         <div>
            <div class="top" v-if="this.faterToSon.show">
                <div class="left">
                    <li v-for="(data,index) in datalist" @click="hacdelClick(data.ename,index,data.name)" :class="index==currentIndex?'active':''">
                                {{data.name}}
                        <i class="iconfont icon-more"></i>
                    </li>
                </div>
                <div class="right">
                    <li v-for="(data,index) in erji_list" @click="back(data.ename,index,data.name)" :class="index==current2Index?'active':''">
                        {{data.name}}
                    <i class="iconfont icon-more"></i></li>
                </div>
            </div>
          </div>
    </template>


    <script >
        export default{
            mounted(){
                this.datalist = this.faterToSon.data.cate.data;
                this.guodu_list = this.faterToSon.data.cate.sub;
                console.log(this.$store.state.cate);
            },
            data () {
               return {
                datalist:[],  //一级菜单数据
                guodu_list:[],
                erji_list:[], //二级菜单数据
                back_data:"",   //传给父组件的数据
                currentIndex:0,
                current2Index:0
               }
            },
            methods:{
                hacdelClick(data,index,name){
                    this.erji_list = this.guodu_list[this.datalist[index].id];
                    this.currentIndex=index;
                    this.$emit("sonTofa",{data:data,name:name});
                    if(index == 0 ||index ==1){
                        this.$emit("showTofa",false);
                    }
                },
                back(data,index,name){
                    // this.back_data = data;
                    // if(index=0){
                    //     data = "all";
                    // }else if{
                    //     index=1
                    //     data = "new";
                    // }
                    // console.log(index);
                    this.current2Index=index;
                    this.$emit("showTofa",false);
                    this.$emit("sonTofa",{data:data,name:name});
                }
            },
            props:["faterToSon"]
        }
    </script>


    <style lang="scss" scoped>
    li{
        list-style:none;
         line-height: 0.72rem;
        //  &:nth-of-type(1){
        //     color:#F64744;
        // }
    }
    .top{
        height: 8rem;
        overflow-y:hidden;
    }
        .left{
            float:left;
            width:50%;
            text-align:center;

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