/*
//vue路由配置
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);//必须要写的 使用路由模块


import Home from "./components/home.vue";
import List from "./components/list.vue";
import About from "./components/about.vue";
import More from "./components/more.vue";
import Detail from "./components/detail.vue";
import Listdetail from "./components/listdetail.vue";
//登陆注册模块
import Login from "./components/login.vue";
import Register from "./components/register.vue";
import Userinfo from "./components/userinfo.vue";
import UserinfoUsername from "./components/userinfos/userinfoUsername.vue";
//about的子路由 mine文件夹下
import Collect from "./components/mine/collect.vue";
import Orderform from "./components/mine/orderform.vue";
import Recommend from "./components/mine/recommend.vue";
import currentbrowse from "./components/mine/currentbrowse.vue";

//head和mine文件下的路由要加载的组件路径

import city from "./components/head/city.vue";
import search from "./components/head/search.vue";
import message from "./components/head/message.vue";
import allmessage from "./components/head/allmessage.vue";
import systemalert from "./components/head/systemalert.vue";
import activehub from "./components/head/activehub.vue";

import groupTicket from "./components/mine/groupTicket.vue";
import vipCard from "./components/mine/vipCard.vue";
import wallet from "./components/mine/wallet.vue";
import canuse from "./components/mine/canuse.vue";
import validate from "./components/mine/validate.vue";
import overdue from "./components/mine/overdue.vue";
import recharge from "./components/mine/recharge.vue";
import paypassword from "./components/mine/paypassword.vue";



// list 子路由要加载的组件
import All from "./components/all.vue";
import Vip from "./components/vip.vue";

// import FilmDetail from "./components/filmDetail.vue";
const routes = [

  { path: '/', redirect: '/home' },

  { path: '/home', component: Home },
  { path: '/list', component: List,
    redirect:"/list/all" , //重定向到这个子路由
    children:[
        {
            path:"all",
            component:All
        },
        {
            path:"all/p/:id",
            component:All
        },
        {
            path:"all/city/:cityid",
            component:All
        },
        {
            path:"vip",

            component:Vip
        }
    ]
  },
  { path: '/about', component: About},

  { path:"/collect",component:Collect},
  { path:"/orderform", component:Orderform},
  { path:"/recommend", component:Recommend},

  { path: '/more', component: More },
  { path: '/detail/:shopid', component: Detail },
  { path: '/list/all/:shopDetaid', component: Listdetail },
  // { path: '/list/all/p/:id', component: All },
  //登陆注册模块
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/userinfo', component: Userinfo },
  { path: '/userinfo/userinfousername', component: UserinfoUsername },


  // LSC 路由
  { path: '/city', component: city },
  { path: '/search', component: search },
  { path: '/datadetail/:rumid', component: List },
  {
    path: '/message',
    component: message,
    redirect:"/message/allmessage" ,
    children:[
        { path: 'allmessage', component: allmessage },
        { path: 'systemalert', component: systemalert },
        { path: 'activehub', component: activehub },
    ]
  },
  {
    path: '/groupticket',
    component: groupTicket ,
    redirect:"/groupticket/canuse",
    children:[
      {path:"canuse", component: canuse},
      {path:"validate", component: validate},
      {path:"overdue", component: overdue}
    ]
  },
  { path: '/vipcard', component: vipCard },
  { path: '/wallet', component: wallet },
  { path: '/recharge', component: recharge },
  { path: '/paypassword', component: paypassword },
  { path: '/currentbrowse', component: currentbrowse }
]

const router = new VueRouter({
  mode: 'hash', // url 看起来美观了 。，支持两个值hash,histroy
    routes  //es6  对象简写
})


export default router;