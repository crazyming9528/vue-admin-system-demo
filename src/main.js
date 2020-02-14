// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import echarts from 'echarts' //如果改用cdn 就不在需要引入
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import ElementUI from 'element-ui';
import 'es6-promise/auto';
import './assets/styles/element-variables.scss';
import store from './store/store.js';
import publicFunction from './publicFunction';
import {Base64} from 'js-base64';
// import { Loading } from 'element-ui';
// import {globalLoading} from "./gloablLoading";
import 'animate.css';
import axios from 'axios';
import {axiosHttp} from "./axiosInterceptor";
import 'font-awesome/scss/font-awesome.scss'
import moment from 'moment'
import globalMixin from './mixin/globalMixin';
import lodash from 'lodash';


Vue.use(mavonEditor);
Vue.use(publicFunction);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(globalMixin);
Vue.config.productionTip = false;
Vue.prototype.$base64 = Base64;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axiosTools = axios;//可用于并发请求


Vue.prototype.$axios = axiosHttp;
Vue.prototype._ = lodash;


Vue.prototype.setStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
Vue.prototype.getStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
Vue.prototype.removeStorage = function (key) {
  localStorage.removeItem(key);
};


Vue.filter('formatDate', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
});

Vue.filter('gender', function (value) {

  let res = "";
  if (value == 1) {
    res = "男";
  } else if (value == 0) {
    res = "女";
  } else {
    res = "未知 ";
  }
  return res;
});

Vue.filter('status', function (value) {

  return value == 1 ? "封禁" : "正常";
});


/* eslint-disable no-new */
window.vueObj = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});


console.log(vueObj);
