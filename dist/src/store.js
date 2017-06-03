import vue from "vue";
import vuex from "vuex";

vue.use(vuex);


const store = new vuex.Store({

    state:{
        username:"",
        cate:"",
        search:""
    },

    actions:{
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

export default store;