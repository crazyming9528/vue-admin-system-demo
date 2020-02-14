import axios from 'axios';

const baseURL = window.API_server.API_ADDRESS;// api的base_url
const timeout = window.API_server.TIMEOUT;
const request = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json"
  }
});
request.interceptors.request.use(function (config) {
  const operator = vueObj.$store.getters.getOperatorInfo;//从vuex 中取出 操作员信息

  if (operator.operator_id !== "") {
    config.headers.Authorization = operator.token;
    config.headers.Operatorid = operator.operator_id;
  } else {
    if (["login,register,check_auth"].find(item => {
      return config.url.indexOf(item)
    })) {
      console.log("无需校验登录状态");
    } else {
      console.log("没有登录, 跳转到登录界面!");
    }
  }

  if (config.method !== "get") {
    vueObj.ele_notify("演示账号无权操作", "error", "错误");
    return ;
  }


  // 在发送请求之前做些什么
  return config;

}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
  const {data, status} = response;
  if (data) {
    if (data["code"] !== 10000) {
      vueObj.ele_notify(data["message"], "warning", data["code"]);

    }
  }

  return response;
}, function (error) {

  const {response: {status}} = error;

  if (status === 401) {
    vueObj.ele_notify("未登录", "error", status);
  } else if (status === 404) {

    vueObj.ele_notify("资源请求错误", "error", status);
  } else if (status >= 500) {
    vueObj.ele_notify("服务器错误", "error", status);
  }


  // if (response.data) {
  //   switch (response.data["code"]) {
  //     case 10400:
  //       console.log("请登录");
  //       break;
  //     case 10401:
  //       console.log("权限验证失败操作");
  //       break;
  //     default:
  //       console.log(data.code, data.message);
  //   }
  // }

  return Promise.reject(error);
});


export default request;
