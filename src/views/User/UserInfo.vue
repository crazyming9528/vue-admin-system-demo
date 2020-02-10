<template>
  <div class="page_wrapper">


    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="18">
          <span class="title">用户信息</span>
          <span class="description">用户信息查询</span>
        </el-col>
        <el-col :span="6">
          <el-button @click="getUserInfo" icon="el-icon-refresh" size="mini" type="primary">刷新</el-button>
          <el-button @click="refreshCache" icon="el-icon-s-opportunity" size="mini" type="primary">更新服务器缓存
          </el-button>

        </el-col>
      </el-row>


      <el-row :gutter="20" class="panel_area">
        <el-col :span="12">

          <el-form :model="userInfo" label-width="180px" ref="form">
            <el-form-item :label="player_type+'ID'">
              {{userInfo.user_id}} <span
              :class="{'font-color-red':userInfo.is_ban==='封号状态','font-color-green':userInfo.is_ban==='未封号'}">({{userInfo.is_ban}})</span>
            </el-form-item>
            <el-form-item :label="player_type+'昵称'">
              {{userInfo.player_name}} <!--            <el-input v-model.trim="userInfo.player_name"></el-input>-->
            </el-form-item>
            <el-form-item label="绑定手机">
              {{userInfo.tel}}
            </el-form-item>
            <el-form-item label="登录微信">
              {{userInfo.openid}}
            </el-form-item>
            <el-form-item label="性别">
              {{userInfo.player_sex}}
            </el-form-item>

            <el-form-item label="注册时间">
              {{userInfo.reg_time}}
            </el-form-item>
            <el-form-item label="最近一次登录时间">
              {{userInfo.login_time}}
            </el-form-item>
            <el-form-item label="登录天数">
              {{userInfo.loginDayTotal}}
            </el-form-item>

          </el-form>


        </el-col>
        <el-col :span="12">
          <el-card class="options">
            <div class="clearfix" slot="header">
              <span>操作</span>
            </div>
            <div class="options_wrapper">
              操作台
            </div>


            <!--            <el-button plain type="primary">发放金币</el-button>-->
            <!--            <el-button plain type="primary">发放钻石</el-button>-->
            <!--            <el-button plain type="primary">发放奖杯</el-button>-->


          </el-card>

        </el-col>


      </el-row>


    </div>

  </div>
</template>

<script>
    import pageMixin from "@/mixin/pageMixin";
    import tableMixin from "@/mixin/tableMixin";
    import TableToolsBox from "../../components/childComponents/TableToolsBox";

    export default {
        name: "PlayInfo",
        components: {
            TableToolsBox,
        },
        mixins: [pageMixin, tableMixin],
        props: {},
        data() {
            return {
                user_id: 0,
                showPopover: {
                    aiScenes: false,
                    gold: false,
                    diamond: false,
                    trophy: false,
                    trophyCoefficient: false,//奖杯加成系数
                    luckyValue: false
                },//用于是否显示 弹出层
                popoverInput: {
                    aiScenes: '',
                    gold: '',
                    diamond: '',
                    trophy: '',
                    trophyCoefficient: '',//奖杯加成系数
                    luckyValue: ''//幸运值
                },
                lockLuckValue: false,//锁定幸运值
                putGold: "",
                userInfo: {
                    user_id: 0,
                    player_name: "",
                    player_portrait: "",
                    player_sex: "",
                    play_times: 0,
                    tel: null,
                    reg_time: "",
                    login_time: "",
                    is_ban: "",

                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }

            }
        },
        watch: {},
        computed: {
            player_type: function () {
                return this.userInfo.is_ai === 0 ? '用户' : 'AI';
            }
        },
        methods: {
            getUserInfo() {

                this.globalMixin_request('/player/read', "get",
                    {
                        user_id: this.user_id,
                    }).then(res => {
                    {
                        const {code, data, message} = res;

                        if (code === 10000) {
                            this.userInfo = data[0];
                            this.popoverInput.trophyCoefficient = this.userInfo.lottery_buff;// 同步 奖杯系数加成

                            this.popoverInput.luckyValue = this.userInfo.lucky_value// 同步幸运值
                            this.userInfo.lucky_lock === 1 ? this.lockLuckValue = true : this.lockLuckValue = false;//同步锁定状态

                            this.popoverInput.aiScenes = this.userInfo.is_ai.toString();
                        }
                    }
                })
            },
            refreshCache() {
                this.globalMixin_request('/player_refresh?user_id=' + this.user_id).then(res => {
                        const {code, data, message} = res;
                        if (code === 10000) {
                            this.ele_notify("更新缓存成功", 'success');
                        }
                    }
                );
            },

        },
        created() {

            this.user_id = this.$route.query.user_id || 0;
            if (!this.user_id) {
                this.$alert('参数有误', '错误', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.globalMixin_goBack();
                    }
                });

                return;
            }


            if (this.user_id) {
                this.getUserInfo()
            }
        },
        mounted() {
        },
    }

</script>

<style lang='scss' scoped>
  @import "../../assets/styles/base.scss";

  .table-expand {
    font-size: 0;
  }

  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .page_wrapper {

    .options {
      position: fixed;
      width: 500px;

      .options_wrapper {

        .options_item {
          margin-bottom: 10px;
        }

      }

    }
  }
</style>
