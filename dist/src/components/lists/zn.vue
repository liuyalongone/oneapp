    <template>
         <div>
                <div class="box" v-if="this.faterToSon.show">
                    <div class="top">
                        <div class="left">
                            <li v-for="(data,index) in datalist" @click="handelClick(index,data)" :class="index==currentIndex?'active':''">
                                {{data.name}}
                            </li>
                        </div>
                    </div>
                </div>
          </div>
    </template>


    <script >
        export default{
            data () {
                return {
                    datalist:[
                        {name:"智能优先",sort:0},
                        {name:"人气优先",sort:4},
                        {name:"销量最高",sort:2}
                    ],
                    currentIndex:0
                }
            },
            methods:{
                handelClick(info,data){
                    this.$emit("showTofa",false);
                    this.$emit("sortTofa",data);
                     this.currentIndex=info;
                }
            },
            props:["faterToSon"]
        }
    </script>


    <style lang="scss" scoped>
    li{
        list-style:none;
         line-height: 0.72rem;
         text-align:center;
    }
    .top{
        height: 8rem;
        overflow-y:hidden;
    }
    .active{
            color:#F64744;
        }
    </style>