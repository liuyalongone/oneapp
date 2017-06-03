import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import Api from "./api";
vue.use(vuex);


const paystore = new vuex.Store({

    state:{
        alllist:[],
        alldetaillist:[],
        goodsnumber:"",


        username:"",
        cate:"",
        search:""
    },
    actions:{
        "GET_DETAILS_ACTION":function(store,payload){
            // store.commit("GET_DETAILS_MUTATION",payload);
            store.commit("GET_DETAILS_MUTATION",payload);
            axios.post(Api.interface+'/api/paycar', {
                payuser: localStorage.getItem("userName"),
                payid: payload.youhui_info.id,
                paynum: 1
            })
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (res) {
                console.log("获取用户信息失败")
            })
        },
        "FIND_PAYCAR_ACTION":function(store,payload){
            axios.post(Api.interface+'/api/findpaycar', {
                payuser: payload
            })
            .then(function (res) {
                var idlist = [];
                console.log(res.data)
                idlist = res.data
                for(var i = 0;i < res.data.length;i++){
                    var reslist=[];
                    axios.get(`/api/details?id=${res.data[i].payid}`).then(res=>{
                        reslist.push(res.data);
                        if(reslist.length==idlist.length){
                            store.commit("FIND_PAYCAR_MUTATION",[reslist,idlist]);//resliat是服务器爬回的数据，idlist是从数据库返回来的数据
                        }
                    })
                }
            })
            .catch(function (res) {
                console.log("失败")
            })
        },


         "SAVE_USERNAME":function(store,payload){
            // console.log(payload);
            //可以根据这参数去后台请求数据， 也可以在这里对数据进行加工
            //通过commit 方法把数据提交给mutations
            //
            store.commit("SAVE_USERNAME",payload);
        },
        "SAVE_CATE":function(store,payload){

            store.commit("SAVE_CATE",payload);
        },
        "SAVE_SEARCH":function(store,payload){

            store.commit("SAVE_SEARCH",payload);
        }


    },

    mutations:{
        "GET_DETAILS_MUTATION":function(state,payload){
            var alllist = state.alllist.filter(item=>item.id==payload.id);
            state.alllist.push(payload);
        },
        "FIND_PAYCAR_MUTATION":function(state,payload){
            console.log(payload)
            var alldetaillist = state.alldetaillist;
            state.alldetaillist = payload;
            for(var i = 0 ; i <　payload[0].length;i++){
                payload[0][i].number = payload[1][i].paynum
            }
        },



        "SAVE_USERNAME":function(state,payload){
            console.log(payload);

                state.username=payload;

        },
        "SAVE_CATE":function(state,payload){
            console.log(payload);

                state.cate=payload;

        },
        "SAVE_SEARCH":function(state,payload){
            console.log(payload);
                state.search=payload;

        }
    }
})

export default paystore;