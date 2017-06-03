import Vue from 'vue'
import router from  "./router"; //加载路由配置这个模块
import App from './App.vue';
import paystore from "./paystore";

//引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

new Vue({
  el: '#app',
  router,
  store:paystore,
  render: h => h(App)
})
