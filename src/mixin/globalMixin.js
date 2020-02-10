let globalMixin = {};


globalMixin.install = function (Vue, options) {
  Vue.mixin({

    methods: {
      test() {
        console.log("test plugin!!");

      },
      globalMixin_goBack() {
        console.log("跳转到上一页");
        this.$router.go(-1);//返回上一层
      },

      globalMixin_jump(name, query) {
        // this.$router.push({name:name,params:params})
        this.$router.push({name, query})
      },
      globalMixin_toastError(msg, callback = null) {
        this.$dialog.toast({
          mes: msg,
          timeout: 1500,
          icon: 'error',
          callback: callback
        });
      },
      globalMixin_toastSuccess(msg, callback = null) {
        this.$dialog.toast({
          mes: msg,
          timeout: 1500,
          icon: 'success'
        });
      },
      globalMixin_toastNone(msg) {
        this.$dialog.toast({
          mes: msg,
          timeout: 1500
        });
      },
      globalMixin_request(url, type = 'get', data = null) {
        return new Promise((resolve, reject) => {
          let allType = "get,post,put,delete";
          type = type.toLowerCase();
          if (allType.indexOf(type) === -1) {
            reject("请求类型错误");
            return;
          }

          if (type === "get" ||  type === 'delete') {
            data = {
              params: data
            }
          }

          this.$axios[type](url, data).then(res => {
            if (res.status >= 200 && res.status < 300) {
              let data = res.data;
              if (data.code !== 10000) {
                let msg = data.code + " : " + data.message;
                if (typeof data.addition === 'string') {
                  msg += " " + data.addition;
                }
                this.ele_notify(msg, 'error', '错误');
              }
              resolve(data);
            }

          }).catch((e) => {
            // console.log(e.response);

            if (e.response.status >= 500) {
              this.ele_notify( e.response.status+' : 服务器错误', 'error', '错误');
            }else {

              let message = e.response.data.code + " : " + e.response.data.message;
              if (typeof e.response.data.addition === 'string') {
                message += " " + e.response.data.addition;
              }
              this.ele_notify(message, 'error', '错误');
            }


            if (e.response.status === 401) {
              localStorage.removeItem('operator');
              this.globalMixin_jump('Login')
            }


            reject(e);// 加上后  使用这个promise的 要做catch捕获 否则控制台报错
          })

        });

      }

    },
    created() {


    }
  })

};


export default globalMixin;
