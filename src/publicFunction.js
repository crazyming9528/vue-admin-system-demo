// 此处用于声明公共的方法 ，此处的方法可以全局调用

exports.install = function (Vue, options) {


  /**
   * 消息提示方法
   * @param message
   * @param type 消息提示类型 success/warning/info/error
   */
  Vue.prototype.tips = function (message, type = "info") {

    this.$message({
      message: message,
      type: type
    });

  };

  /**
   *
   * @param message
   * @param type
   * @param confirmCallback
   * @param cancelCallback
   * @param title
   * @param confirmButtonText
   * @param cancelButtonText
   */
  Vue.prototype.ele_confirm = function (message, type, confirmCallback, cancelCallback, title = "提示", confirmButtonText = `确定`, cancelButtonText = `取消`) {
    this.$confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      type,
    }).then(() => {

      confirmCallback()
    }).catch(() => {
      cancelCallback()
    })
  };


  /**
   *
   * @param message
   * @param type
   * @param confirmCallback
   * @param cancelCallback
   * @param title
   * @param confirmButtonText
   */
  Vue.prototype.ele_alert = function (message, type = "info", confirmCallback = null, cancelCallback = null, title = "提示", confirmButtonText = `确定`) {
    this.$alert(message, {
      confirmButtonText,
      title,
      type,
    }).then((res) => {
      if (typeof confirmCallback === "function") {
        confirmCallback();
      }
    }).catch((res) => {
      if (typeof cancelCallback === "function") {
        cancelCallback();
      }
    })
  };


  /**
   * 通知提示方法
   * @param type 通知类型 success/warning/info/error
   * @param title 自定义标题
   * @param message 自定义通知内容
   */
  Vue.prototype.ele_notify = function (message, type = 'warning', title = "提示") {

    this.$notify({
      title: title,
      message: message,
      type: type,
      offset: 50
    });


  };

  /**
   *
   * @param url
   * @param type
   * @param data
   * @param successCallback
   * @param errorCallback
   */
  Vue.prototype.requestApiFnc = function (url, type, data = null, successCallback, errorCallback = null) {

    // return new Promise((resolve, reject)=>{
    //
    // });


    // return new Promise((resolve, reject) =>{
    //   let allType = "get,post,put,delete";
    //   type = type.toLowerCase();
    //   if (allType.indexOf(type) === -1) {
    //     reject("请求类型错误");
    //     return;
    //   }
    //
    //   this.$axios[type](url, {params: data}).then((res) => {
    //     console.log(res);
    //     resolve(res);
    //
    //   }).catch((e) =>{
    //
    //     console.log(e);
    //
    //   })
    //
    // });

    // return;
    // if (type === "get") {
    //   this.$axios.get(url, {params: data}).then((res) => {
    //     successCallback(res)
    //   }).catch((error) => {
    //     if (errorCallback) {
    //       errorCallback(error)
    //     }
    //     if (error.response) {
    //       if(error.response.status===403){
    //         this.ele_alert("无权访问", "error");
    //         return;
    //       }
    //       this.ele_alert("系统错误，请稍后再试！ [Type:" + type + " , Status code:" + error.response.status + "]", "error");
    //     } else {
    //       this.ele_alert("未知错误！", "error");
    //       console.log(error);
    //     }
    //
    //
    //   });
    // } else if (type === "post") {
    //   this.$axios.post(url, data).then((res) => {
    //     successCallback(res)
    //   }).catch((error) => {
    //     if (errorCallback) {
    //       errorCallback(error)
    //     }
    //     if (error.response) {
    //       if(error.response.status===403){
    //         this.ele_alert("无权访问", "error");
    //         return;
    //       }
    //       this.ele_alert("系统错误，请稍后再试！ [Type:" + type + " , Status code:" + error.response.status + "]", "error");
    //     } else {
    //       this.ele_alert("未知错误！", "error");
    //       console.log(error);
    //     }
    //
    //
    //   });
    // }else if (type === "post2") {
    //   let p="";
    //   for (let item in data ){
    //     if (data.hasOwnProperty(item)){
    //       p+=item+"="+data[item]+"&"
    //     }
    //
    //   }
    //   console.log(p);
    //   this.$axios.post(url+"?"+p).then((res) => {
    //     successCallback(res)
    //   }).catch((error) => {
    //     if (errorCallback) {
    //       errorCallback(error)
    //     }
    //     if (error.response) {
    //       if(error.response.status===403){
    //         this.ele_alert("无权访问", "error");
    //         return;
    //       }
    //       this.ele_alert("系统错误，请稍后再试！ [Type:" + type + " , Status code:" + error.response.status + "]", "error");
    //     } else {
    //       this.ele_alert("未知错误！", "error");
    //       console.log(error);
    //     }
    //
    //
    //   });
    // }
    // else if (type === "put") {
    //   this.$axios.put(url, data).then((res) => {
    //
    //     successCallback(res)
    //   }).catch((error) => {
    //     if (errorCallback) {
    //       errorCallback(error)
    //     }
    //     if (error.response) {
    //       if(error.response.status===403){
    //         this.ele_alert("无权访问", "error");
    //         return;
    //       }
    //       this.ele_alert("系统错误，请稍后再试！ [Type:" + type + " , Status code:" + error.response.status + "]", "error");
    //     } else {
    //       this.ele_alert("未知错误！", "error");
    //       console.log(error);
    //     }
    //
    //   });
    // } else if (type === "delete") {
    //   this.$axios.delete(url, {params: data}).then((res) => {
    //     successCallback(res);
    //   }).catch((error) => {
    //     if (errorCallback) {
    //       errorCallback(error)
    //     }
    //     if (error.response) {
    //       if(error.response.status===403){
    //         this.ele_alert("无权访问", "error");
    //         return;
    //       }
    //       this.ele_alert("系统错误，请稍后再试！ [Type:" + type + " , Status code:" + error.response.status + "]", "error");
    //     } else {
    //       this.ele_alert("未知错误！", "error");
    //       console.log(error);
    //     }
    //
    //   });
    // } else {
    //   this.ele_alert("请求类型错误！", "error")
    // }
  };

  /**
   * 切换路由后调用此方法实现子页面从顶部开始显示
   */
  Vue.prototype.toTop = function () {

    window.scrollTo(0, 0);

    setTimeout(function () {
      var em = document.getElementsByClassName("el-main")
      em[0].scrollTop = 0;
      //console.log(em[0].scrollTop);
    }, 10)


  };


  /**
   * 获取当前时间的方法
   * @returns {string}
   */
  Vue.prototype.showTime = function (d) {
    let year;
    let month;
    let date;
    let hour;
    let minute;
    let second;
    let nowtime;
    if (d) {
      nowtime = new Date(d);
    } else {
      nowtime = new Date();
    }

    year = nowtime.getFullYear();
    month = nowtime.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    date = nowtime.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    hour = nowtime.getHours();

    if (hour < 10) {
      hour = "0" + hour;
    }
    minute = nowtime.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    second = nowtime.getSeconds();
    if (second < 10) {
      second = "0" + second;
    }

    let nowTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    return nowTime;
  };


  /**
   * 节流函数
   * @param fn
   * @param wait
   * @param immediate
   * @returns {Function}
   */
  Vue.prototype.debounceFn = function (fn, wait, immediate) {
    immediate = immediate || false;
    var timer = null;
    var count = 0;
    return function () {
      var _this = this;
      var _arg = arguments;
      clearTimeout(timer);
      if (immediate && !count) {
        fn.apply(_this, _arg);
        count++;
      } else {
        timer = setTimeout(function () {
          console.log(this);
          fn.apply(_this, _arg);
          count++;
        }, wait);
      }
    }

  }

  /**
   * 节流函数
   * @param time
   * @param action
   * @returns {Function}
   */
  Vue.prototype.throttleFn = function (time, action) {
    var timer = null;
    return function () {
      var context = this;
      var args = arguments;
      if (!timer) {
        timer = setTimeout(function () {
          action.apply(context, args);
          timer = null;
        }, time);
      }
    }
  }


};
