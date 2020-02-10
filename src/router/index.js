import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Auth/login'
import Register from '@/views/Auth/register'

import {dynamicRoutes} from "./dynamicRoutes"


Vue.use(Router);


const r = new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },


  ]
});


let refreshMark = true;
r.beforeEach((to, from, next) => {
  if (refreshMark) {
    // console.log("刷新页面了");
    r.addRoutes([dynamicRoutes]);
    r.options.routes.push(dynamicRoutes);
    // r.app.$options.store.commit("setMenu",[dynamicRoutes])
    refreshMark = false;
    next({path: to.path});//当前的导航被中断，然后进行一个新的导航
  }
  next();
});


export default r
