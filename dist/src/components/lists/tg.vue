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
                        {name:"全部商家",sort:3},
                        {name:"团购商家",sort:5},
                        {name:"其他活动",sort:6}
                    ],
                    currentIndex:0
                }
            },
            methods:{
                handelClick(info,data){
                    this.$emit("showTofa",false);
                     this.$emit("shjiaTofa",data);
                    console.log(info);
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