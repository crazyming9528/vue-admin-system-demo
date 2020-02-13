<template>
  <div class="c-main">
    <div class="title"><h1>{{this.$store.getters.systemInfo.title}}</h1></div>
    <div :class=[animation] class="loginWrapper ">
      <el-form :label-position="labelPosition" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model.trim="form.username"></el-input>
        </el-form-item>
        <el-form-item @keyup.enter.native="login" label="密码">
          <el-input type="password" v-model.trim="form.password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="loginFn" type="primary">登录</el-button>
          <!--          <el-button @click="registerFn" type="text">注册账号</el-button>-->
        </el-form-item>
      </el-form>

    </div>
    <div class="copyright">
      <div class="logo "><img alt="" src="../../assets/logo.png"></div>
      <span>欢迎登录{{this.$store.getters.systemInfo.title}}</span></div>
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>


  </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import {getRoleInfoById} from "../../api/role";
    import {login} from "../../api/operator"

    export default {
        name: "login",
        data() {
            return {

                animation: 'square2',
                labelPosition: "top",
                form: {
                    username: "",
                    password: "",
                },
                temp: null,
            }
        },
        computed: {},
        methods: {
            ...mapMutations(["setOperatorInfo", "setOperatorRole"]),
            checkAccount() {
                return new Promise((resolve, reject) => {

                    if (!this.form.username || !this.form.password) {
                        return reject({text: "用户名和密码不能为空！", type: "warning"});
                    }
                    login(this.form.username, this.form.password).then(res => {
                        const {code, data: userData, message, addition} = res.data;
                        if (code === 10000) {
                            if (!userData.rid) {
                                return reject({text: "该账号无角色信息,请联系管理员！", type: "warning"});
                            }
                            localStorage.setItem('operator', this.$base64.encode(JSON.stringify(userData)));
                            // this.$store.commit('setOperatorInfo', data);
                            this.setOperatorInfo(userData);
                            this.temp = userData.rid;
                            resolve();

                        } else if (code === 10301
                        ) {
                            this.form.username = '';
                            this.form.password = '';
                            return reject({text: "用户名或密码错误！", type: "error"});
                        } else {
                            return reject({text: "登录失败！", type: "error"});
                        }
                    })

                })
            },

            getOperatorInfo() {
                return new Promise((resolve, reject) => {
                    getRoleInfoById(this.temp).then(res => {
                            const {code, data, message, addition} = res.data;
                            if (code === 10000) {
                                localStorage.setItem('role', this.$base64.encode(JSON.stringify(data)));
                                this.setOperatorRole(data);
                                resolve();
                            } else {
                                return reject({text: "获取角色信息失败！", type: "error"});
                            }
                        }
                    );

                })

            },
            async loginHandler() {
                await this.checkAccount();
                await this.getOperatorInfo();
            },
            loginFn() {
                this.loginHandler().then(res => {
                    // this.$router.addRoutes([dynamicRoutes]);
                    // this.$router.options.routes.push(dynamicRoutes);
                    this.globalMixin_jump('Home');
                }).catch(({text, type}) => {
                    this.ele_alert(text, type);
                });

            },
            registerFn() {
                this.tips("暂不支持注册 请联系管理员", "warning");
            }
            ,

        },
        created() {

            // console.log({test:mapMutations(['setShowNav','setShowTop'])});
            // console.log({
            //     getter() {
            //     }, ...mapMutations(['setShowTop', 'setShowNav'])
            // }, 222222);

            const login = localStorage.getItem('operator');
            const role = localStorage.getItem('role');
            if (!login || !role) {
                console.log("没有登录");
            } else {
                // this.tips("您已经登录过了", "success");
                // this.globalMixin_jump('Home');
                // window.location.reload();//导航path 错误bug 临时解决方法
            }

        }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base.scss";

  @media (max-height: 650px) {
    .title {
      h1 {
        font-size: 20px !important;
      }
    }
    .copyright {
      display: none;
    }
  }

  /*@media (max-height: 500px) {*/

  /*  .loginWrapper {*/
  /*    display: none;*/
  /*  }*/
  /*}*/

  @media (max-height: 200px) {
    .title {
      display: none;
    }
  }

  @keyframes bg {

    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }

  }

  @keyframes login {

    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }

  }

  .square2 {

    /*animation: login 2s ease-in-out 1;*/
    animation: square2 3s ease-in-out 1;
  }


  .shake {
    -webkit-animation-name: shake;
    animation-name: shake;
  }

  @keyframes shake {

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }

  }

  .c-main {
    width: 100%;
    height: 100%;
    min-height: 700px;
    overflow: hidden;
    position: relative;
    /*background-color: #f3f3f3;*/
    background-color: $baseColor1;
    background-image: linear-gradient(120deg, $baseColor1 10%, $baseColor3 80%); //background-image: linear-gradient(120deg, $baseColor1 10%, #7bbdbc 100%);
    background-size: 300% 100%;
    animation: bg 10s ease-in-out infinite alternate;


    .title {
      position: absolute;
      top: 15%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      animation: op 4s ease-in-out 1;
      text-align: center;

      h1 {
        color: white;
        font-weight: lighter;
        font-size: 30px;
      }
    }


    .loginWrapper {


      background-color: white;


      width: 400px;
      height: 300px;
      max-width: 80%;
      color: $baseColor1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      border-radius: 2px;
      z-index: 999;
      padding: 10px;
      box-sizing: border-box;


    }


    .copyright {
      position: fixed;
      bottom: 50px;
      left: 0;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 12px;


      .logo {
        width: 100px;
        margin: 0 auto;

        img {
          width: 100%;
        }
      }
    }


  }

  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    bottom: -160px;
    animation: square 15s infinite;
    transition-timing-function: linear;
    border-radius: 2px;
  }

  .bg-bubbles li:nth-child(1) {
    left: 10%;
  }

  .bg-bubbles li:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    animation-delay: 1s;
    animation-duration: 17s;
  }

  .bg-bubbles li:nth-child(3) {
    left: 25%;
    animation-delay: 3s;
  }

  .bg-bubbles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-duration: 22s;
    background-color: rgba(255, 255, 255, 0.25);
  }

  .bg-bubbles li:nth-child(5) {
    left: 70%;
  }

  .bg-bubbles li:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    animation-delay: 2s;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .bg-bubbles li:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    animation-delay: 6s;
  }

  .bg-bubbles li:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;

    animation-delay: 14s;
    animation-duration: 40s;
  }

  .bg-bubbles li:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    -webkit-animation-delay: 2s;
    animation-delay: 1s;
    animation-duration: 40s;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .bg-bubbles li:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    animation-delay: 10s;
  }

  @keyframes square {
    0% {

      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 1;
      transform: translateY(-700px) rotate(600deg);
    }
  }

  @keyframes square2 {
    0% {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    100% {
      opacity: 0.8;
      transform: translate(-50%, -60%);
    }
  }

  @keyframes op {
    0% {

      opacity: 0;
    }
    100% {
      opacity: 0.8;

    }
  }

</style>
