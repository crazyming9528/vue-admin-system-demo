import {globalLoading} from "./gloablLoading";
import axios from 'axios'
import store from './store/store'
// import {Base64} from 'js-base64';

let baseURL =  process.env.BASE_API;
let timeout = window.API_server.TIMEOUT;

let http = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json"
  }
});


// 添加请求拦截器
http.interceptors.request.use(function (config) {


  // 检查权限的请求 和 home2 页面的请求 无需显示加载动画
  if (config.url.indexOf("rts_index") !== -1 || config.url.indexOf("check_auth") !== -1 || store.getters.getIsHome2  ) {
  // if ( config.url.indexOf("rts_index") !== -1 || config.url.indexOf("rts_echart") !== -1 || config.url.indexOf("check_auth") !== -1  ) {
  //   console.log("统计首页 无需展示加载动画")
  } else {

    // showFullScreenLoading()
    globalLoading.showFullScreenLoading();

  }

  // console.log(config);

  let operator = vueObj.$store.getters.getOperatorInfo;//从vuex 中取出 操作员信息
  if (operator) {
    config.headers.Authorization = operator.token;
    config.headers.Operatorid = operator.operator_id;
  } else {

    // console.log(config.url)


    //不需要校验的接口
    if (config.url.indexOf("login") !== -1 || config.url.indexOf("register") !== -1 || config.url.indexOf("check_auth") !== -1) {
      console.log("无需校验")
    } else {

      console.log("没有登录");
      // router.push({path: "/login"});

    }

  }


  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // globalLoading.tryHideFullScreenLoading();

    // tryHideFullScreenLoading();
    globalLoading.tryHideFullScreenLoading();

  console.log(response)
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么

  globalLoading.tryHideFullScreenLoading();

  // setTimeout(()=>{
  //   // tryHideFullScreenLoading();
  //   globalLoading.tryHideFullScreenLoading();
  // },300);
  return Promise.reject(error);
});


export let axiosHttp = http;
