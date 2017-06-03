<template>
    <div class="allpayBox" >
        <li v-for="(data,index) in goodslist[0]">
            <input type="checkbox" :value="data" class="checkBox" v-model="checkedValue"/>
            <h3 class="goodsname">{{data.store.name}}</h3>
            <h3 class="goodsprice">价格：{{data.youhui_info.price}}</h3>
            <button class="delBut" @click="delClick(index)">-</button>
            <input type="text" class="numInp" :value="data.number"　>
            <button class="addBut" @click="addClick(index)">+</button>
            <img :src="data.youhui_info.images[0]">
        </li>
        <div class="sumBox">
            <span class="sumSpan">
                总价：{{sum}}
            </span>
            <button class="sumBtn">结算</button>
        </div>
    </div>
</template>


<script >
import Api from "../../../api";
export default{
    mounted(){
        this.$store.dispatch("FIND_PAYCAR_ACTION",localStorage.getItem("userName"));
    },
    data(){
        return{
            goodsnum:1,
            checkedValue:[]
        }
    },
    computed:{
        goodslist(){
            return this.$store.state.alldetaillist
        },
        sum(){
            var sum = 0;
            this.checkedValue.forEach(item=>{
                sum+= item.number*item.youhui_info.price;
            })
            return sum
        }

    },
    watch:{

    },
    methods:{
        delClick(index){
            if(this.goodslist[0][index].number<=0){
                this.goodslist[0][index].number = 0;
            }else{
                this.goodslist[0][index].number = this.goodslist[0][index].number - 1;
            }
            axios.post(Api.interface+'/api/changenum', {
                payid: this.goodslist[0][index].youhui_info.id,
                paynum: this.goodslist[0][index].number
            })
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (res) {
                console.log("获取用户信息失败")
            })
        },
        addClick(index){
            this.goodslist[0][index].number = this.goodslist[0][index].number + 1;
            axios.post(Api.interface+'/api/changenum', {
                payid: this.goodslist[0][index].youhui_info.id,
                paynum: this.goodslist[0][index].number
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (res) {
                console.log("获取用户信息失败")
            })
        },
    }
}
</script>


<style lang="scss" scoped>
.allpayBox{
    width:100%;
    height:100%;
    li{
        background:white;
        list-style:none;
        width:100%;
        height:2rem;
        position:relative;
        color:gray;
        img{
            height:80%;
            position:absolute;
            left:0.3rem;
            top:0.2rem;
        }
        .checkBox{
            width:0.3rem;
            height:0.8rem;
            outline:none;
            border:none;
            position:absolute;
            top:0.8rem;
            right:1rem;;
        }
        .goodsname{
            position:absolute;
            left:3.1rem;
            top:0.2rem;
            font-size:0.35rem;
        }
        .goodsprice{
            position:absolute;
            left:3.1rem;
            top:0.75rem;
            font-size:0.3rem;
            font-family:"黑体";
        }
        button{
            position:absolute;
            top:1.2rem;
            width:0.6rem;
            height:0.6rem;
            border:none;
            outline:none;
            background:red;
            font-size:0.5rem;
            color:white;
        }
        .delBut{
            left:3.2rem;
        }
        .addBut{
            left:4.6rem;
        }
        .numInp{
            text-align:center;
            border:none;
            outline:none;
            height:0.6rem;
            width:0.8rem;
            position:absolute;
            left:3.8rem;
            top:1.2rem;
        }
    }
}
.sumBox{
    width:100%;
    height:1rem;
    position:fixed;
    bottom:1.1rem;
    background:white;
    z-index:1;
}
.sumSpan{
    position:absolute;
    left:1rem;
    line-height:1rem;
    color:#ff5722;
    font-size:0.4rem;
    font-family:"黑体";
    font-weight:900;
}
.sumBtn{
    height:0.7rem;
    width:2rem;
    position:absolute;
    right:0.5rem;
    top:0.2rem;
    border:none;
    background: #ffc40f;
    border-radius: 0.1rem;
    color:white;
    font-size:0.3rem;
    outline:none;
}
</style>