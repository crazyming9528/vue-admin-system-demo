<template>
  <div class="frame">
    <el-container class="frame-wrapper">
      <el-header class="frame-header" ref="fheader" v-show="showTop">
        <div class="left wow fadeInLeft">
          <div class="logo" v-show="!isCollapse"><img alt="logo" src="../assets/logo.png"/></div>
          <span>{{this.$store.getters.systemInfo.title}}</span>
          <!--          <el-button @click="toggleNav" icon="el-icon-menu" size="mini" style="margin-left: 20px;font-weight: lighter"-->
          <!--                     type="text">切换菜单-->
          <!--          </el-button>-->

        </div>
        <div class="right clearfix wow fadeInRight">
          <div class="time hidden-sm-and-down" v-if="nowTime">{{nowTime | formatDate}}</div>
          <div class="userInfo">
            <div class="avatar"><img height="45" src="../assets/other-img/avatar.jpg" width="45"/></div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">{{this.operatorInfo.operator_name}}<i
                class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <i class="el-icon-bell"></i> 通知
                  <el-badge :value="12" class="mark"/>
                </el-dropdown-item>
                <el-dropdown-item>

                  <i class="el-icon-refresh"></i>
                  刷新
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-setting"></i>
                  设置
                </el-dropdown-item>

                <el-dropdown-item>
                  <i class="el-icon-setting"></i>
                  <el-button @click="changePassword" type="text">修改密码</el-button>
                </el-dropdown-item>

                <el-dropdown-item>
                  <i class="el-icon-setting"></i>
                  <el-button @click="logoutFn" type="text">退出登录</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container class="frame-container">
        <el-aside class="frame-aside" style="transition: all 1s" v-show="showNav">
          <el-scrollbar style="height: 100%">
            <div class="logo" v-show="isCollapse"><img alt="logo" src="../assets/logo.png"/>
            </div>
            <el-menu :collapse="!isCollapse" :default-active="activeMenuIndex" :router=true :unique-opened=true
                     @close="handleClose"
                     @open="handleOpen"
                     active-text-color="#33a0d7" background-color="#4f5254" class="el-menu-vertical-demo"
                     style="border: none;"
                     text-color="#fff">

              <MenuListItem :routes="routes"></MenuListItem>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main class="frame-main">

          <div class="all_page_wrapper">
            <BreadcrumbBox class="animated animation_delay_0_3s  fadeInDown" v-show="showBreadcrumb"></BreadcrumbBox>
            <router-view></router-view>
          </div>

        </el-main>


      </el-container>
    </el-container>


    <el-dialog :append-to-body="true"
               :close-on-click-modal="false"
               :title="dialogTitle"
               :visible.sync="dialogVisible">
      <div class="dialog_wrap">
        <el-form>
          <el-form-item>
            用户名:
            <el-input
              clearable
              placeholder="请输入内容"
              v-model.trim="username">
            </el-input>

          </el-form-item>


          <el-form-item>
            密码:
            <el-input
              clearable
              placeholder="请输入内容"
              type="password"
              v-model.trim="password">
            </el-input>

          </el-form-item>

          <el-form-item>
            确认密码:
            <el-input
              clearable
              placeholder="请输入内容"
              type="password"
              v-model.trim="password2">
            </el-input>

          </el-form-item>
        </el-form>

      </div>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="updatePassword" type="primary">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

    import BreadcrumbBox from '@/components/childComponents/BreadcrumbBox';
    import MenuListItem from '@/components/childComponents/MenuListItem';
    import {logout} from "../api/operator";
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: "frame",
        components: {BreadcrumbBox, MenuListItem},

        data() {
            return {
                username: '',
                password: "",
                password2: '',
                dialogTitle: "",
                dialogVisible: false,
                isCollapse: true,
                nowTime: "",
                timeInterval: 0,
                authInterval: 0,
                user: {}
            }
        },
        computed: {
            ...mapGetters({
                systemInfo: "systemInfo",
                showNav: "getShowNav",
                showTop: "getShowTop",
                showBreadcrumb: "getShowBreadcrumb",
                operatorInfo: "getOperatorInfo"
            }),
            // ...mapGetters(['systemInfo','showNav','showTop','showBreadcrumb','operatorInfo']),
            // systemInfo() {
            //     return this.$store.getters.systemInfo;
            // },
            // showNav() {
            //     return this.$store.getters.getShowNav;
            // },
            // showTop() {
            //     return this.$store.getters.getShowTop;
            // },
            // showBreadcrumb() {
            //     return this.$store.getters.getShowBreadcrumb;
            // },
            // operatorInfo: function () {
            //     return this.$store.getters.getOperatorInfo;
            // },
            activeMenuIndex: function () {
                return this.$route.path;
            },

            routes() {


                console.log(this.$router.options.routes);
                //  不用 foreach,es6 find 实践
                let Frame = this.$router.options.routes.find(item => item.name === 'Frame')

                Frame.children.forEach((item, index) => {
                    if (item.children) {
                        item.children.forEach(child => {
                            child.path = '/' + item.path + '/' + child.path
                            // child.path = '/' + child.path
                        })
                    }

                    if (item.path === '/') Frame.children.splice(index, 1);

                });

                return Frame.children;

            },


        },
        methods: {
            ...mapMutations(['setOperatorInfo', 'setOperatorRole']),
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            // toggleNav() {
            //     this.isCollapse = !this.isCollapse;
            // }


            changePassword() {
                this.dialogTitle = `修改用户名和密码`;
                this.dialogVisible = true;

            },
            updatePassword() {

                if (!this.username || !this.password || !this.password2) {
                    this.ele_notify('信息填写不正确');
                    return;

                }
                if (this.password !== this.password2) {
                    this.ele_notify('两次输入的密码不相同 请重新输入');
                    this.password = this.password2 = '';
                    return;
                }

                let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);

                if (!reg.test(this.password)) {
                    this.ele_notify('密码必须包含数字与字母');
                    return;
                }

                this.globalMixin_request('/user_manage/update', 'put', {
                    username: this.username,
                    password: this.password,
                    user_id: this.operatorInfo.operator_id
                }).then(res => {

                        const {code, data, message} = res;
                        if (code === 10000) {
                            this.ele_notify('修改账号信息成功,当前账号信息已失效 请重新登录!');
                            this.checkAuth();
                        }
                    }
                )

            },

            logoutFn() {

                logout().then(res => {
                        const {code, data, message} = res.data;
                        if (code === 10000) {
                            localStorage.removeItem('operator');
                            console.log(res, '注销成功');
                            this.tips("注销成功", "success");
                            this.globalMixin_jump("Login");
                        }


                    }
                )

            },
            /**
             * 检查登录
             */
            checkAuth() {
                //这里不用做任何处理  拦截器  mixin  里边已经写了
                this.globalMixin_request('check_auth');
            }


        },
        destroyed() {
            clearInterval(this.timeInterval);
            clearInterval(this.authInterval);
        },
        created() {
            this.timeInterval = setInterval(() => {
                this.nowTime = new Date();
            }, 1000);

            let operator = localStorage.getItem("operator");  //从缓存中取操作员信息
            let role = localStorage.getItem("role");  //从缓存中取操作员信息
            if (!operator || !role) {
                this.$router.push({path: "/login"});
            } else {
                // this.$store.commit('setOperatorInfo', JSON.parse(this.$base64.decode(localStorage.getItem("operator"))));
                this.setOperatorInfo(JSON.parse(this.$base64.decode(localStorage.getItem("operator"))));
                this.setOperatorRole(JSON.parse(this.$base64.decode(localStorage.getItem("role"))));
                this.authInterval = setInterval(() => {
                    this.checkAuth();
                }, 30000);
            }


            // this.getUserInfo();

        }, mounted() {
            this.username = this.operatorInfo.operator_name;
            console.log({...mapGetters(['systemInfo', 'showNav', 'showTop', 'showBreadcrumb', 'operatorInfo'])}, 55555)
        }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/base.scss';


  @keyframes bg {

    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }

  }

  .frame-header {
    overflow: hidden;
    height: 50px !important;
    color: $fontColor2;
    line-height: 50px;
    background-color: $baseColor1;
    background-image: linear-gradient(120deg, $baseColor1 10%, #21a3b0 80%);
    //background-image: linear-gradient(120deg, $baseColor1 10%, $baseColor3 80%); //background-image: linear-gradient(120deg, $baseColor1 10%, #7bbdbc 100%);
    background-size: 200% 100%;
    animation: bg 10s ease-in-out infinite alternate;
  }


  .frame-header {
    .left {
      float: left;
      color: white;

      .logo {
        display: inline-block;
        width: 50px;
        height: 50px;
        position: relative;
        vertical-align: top;
        font-weight: lighter;
        margin-left: -20px;

        img {
          width: 50%;
          height: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      span {
        vertical-align: top;
      }
    }

    .right {
      float: right;

      .time {
        display: inline-block;
        vertical-align: top;
        color: white;
      }

      .userInfo {
        display: inline-block;

        .avatar {
          display: inline-block;
          width: 50px;
          height: 50px;
          position: relative;

          img {
            width: 50%;
            height: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .el-dropdown {
          display: inline-block;
          vertical-align: top;
          cursor: pointer;

          .el-dropdown-link {
            color: $fontColor2;
          }
        }
      }
    }
  }

  .frame-aside {
    background-color: $baseColor2;
    color: #333;
    width: auto !important;


    .fa {
      font-size: 18px;
      margin-right: 8px;
    }

    .logo {
      /*width: 100%;*/
      width: 200px;
      text-align: center;
      margin: 50px 0 50px 0;
      animation: flipInY 3s linear;

      img {
        /*width: 40%;*/
        width: 40%;
        border-radius: 50%;
        background-color: $baseColor1;
        transition: all 0.5s;
        animation: boxShow 5s linear infinite alternate;
        cursor: pointer;

        &:hover {
          width: 50%
        }
      }

    }
  }

  .frame-main {
    padding: 0;
  }

  .all_page_wrapper {
    padding: 20px;
  }

  @keyframes boxShow {
    0% {
      /*box-shadow: 0 0 0px 0px #7b7b7b;*/
      background-color: $baseColor1;
      box-shadow: 0 0 10px 5px $baseColor1


    }
    100% {
      /*box-shadow: 0 0 30px 10px #7b7b7b;*/
      background-color: $baseColor3;
      box-shadow: 0 0 30px 5px $baseColor3;

    }

  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }


</style>
