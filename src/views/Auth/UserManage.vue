<template>
  <div class="page_wrapper" v-show="pageMixin_showPage">


    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">用户管理</span>
          <span class="description">新增、删除、修改用户信息</span>
        </el-col>
      </el-row>


      <el-row>
        <!--        <el-col :span="24">-->
        <!--          <TableToolsBox @search="search">-->
        <!--            <template slot="search">-->
        <!--              <el-input clearable-->
        <!--                        maxlength="10"-->
        <!--                        placeholder="请输入内容"-->
        <!--                        show-word-limit-->
        <!--                        style="display: inline-block;width: 200px"-->
        <!--                        type="text"-->
        <!--                        v-model="textData"-->
        <!--              >-->
        <!--              </el-input>-->
        <!--              <el-input clearable-->
        <!--                        maxlength="10"-->
        <!--                        placeholder="请输入内容"-->
        <!--                        show-word-limit-->
        <!--                        style="display: inline-block;width: 200px"-->
        <!--                        type="text"-->
        <!--                        v-model="textData"-->
        <!--              >-->
        <!--              </el-input>-->
        <!--              <el-input clearable-->
        <!--                        maxlength="10"-->
        <!--                        placeholder="请输入内容"-->
        <!--                        show-word-limit-->
        <!--                        style="display: inline-block;width: 200px"-->
        <!--                        type="text"-->
        <!--                        v-model="textData"-->
        <!--              >-->
        <!--              </el-input>-->

        <!--            </template>-->
        <!--          </TableToolsBox>-->
        <!--        </el-col>-->
      </el-row>

      <el-row class="panel_area">
        <el-col :span="24">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              label="#"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column

              align="center"
              label="用户ID"
              prop="id"
              width="100">
            </el-table-column>
            <el-table-column
              label="用户名"
              prop="username"
              width="250">
            </el-table-column>
            <el-table-column

              align="center"
              label="状态"
              prop="status"
              width="100">
            </el-table-column>

            <el-table-column

              align="center"
              label="创建时间"
              prop="create_time"
              width="250">
            </el-table-column>
            <el-table-column

              align="center"
              label="最后登录时间"
              prop="last_login_time"
              width="250">
            </el-table-column>

            <el-table-column

              label="备注"
              prop="remark"
            >
            </el-table-column>


            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="100">

              <template slot-scope="scope">
                <el-button @click="openDialog('edit',scope.row)" size="small" type="text">编辑</el-button>

                <el-button @click="openDialog('delete',scope.row)" size="small" type="text">删除</el-button>
              </template>
            </el-table-column>

          </el-table>


        </el-col>


      </el-row>

      <el-row class="panel_area">
        <div class="block">
          <el-pagination
            :current-page="tableMixin_currentPage"
            :page-size="tableMixin_pageSize"
            :page-sizes="tableMixin_pageSizeArr"
            :total="tableMixin_total"
            @current-change="tableMixin_handleCurrentChange"
            @size-change="tableMixin_handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>


      </el-row>

    </div>


  </div>

</template>

<script>
  import TableToolsBox from "../../components/childComponents/TableToolsBox";
  import pageMixin from "@/mixin/pageMixin";
  import tableMixin from "@/mixin/tableMixin";

  export default {
    name: "userManagement",
    mixins: [pageMixin, tableMixin],
    components: {
      TableToolsBox,
    },
    data() {
      let checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        if (value.length < 3 || value.length > 15) {
          return callback(new Error('用户名长度要求3-15字符'));
        }
        this.requestApi('checkName', function (v) {
          if (!v) {
            return callback(new Error('该用户名不可用'));
          } else {
            callback(); //这个会变绿
          }
        });
      };
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        if (value.length !== 11 || isNaN(value)) {
          return callback(new Error('手机号格式不正确'));
        }
        this.requestApi('checkPhone', function (v) {
          if (!v) {
            return callback(new Error('该手机号不可用'));
          } else {
            callback(); //这个会变绿
          }
        });

      };
      let checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        if (value.indexOf("@") === -1) {
          return callback(new Error('邮箱格式不正确'));
        }
        this.requestApi('checkEmail', function (v) {
          if (!v) {
            return callback(new Error('该邮箱不可用'));
          } else {
            callback(); //这个会变绿
          }
        });
      };

      let checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        if (value.length <= 5) {
          return callback(new Error("密码安全性过低"));
        } else {
          callback(); //这个会变绿
        }
      };
      return {
        loading: true,
        action: "",//当前行为
        currentPage: 1,//分页当前页
        page_total: 0,//分页 总数
        page_size: 10,//分页  一页的大小
        userID: "",//用户id 唯一标识
        dialogVisible: false,//确认 的删除弹出  是否显示
        dialogFormNew: false,// 添加 或 编辑 的 模态框  是否显示
        formLabelWidth: "80px",//模态框右侧的label间距
        formRulers: {
          userName: [
            {validator: checkUserName, trigger: 'blur'},
          ],
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          password: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        },

        fromCheck1: {
          userName: false,
          phone: false,
          email: false,
        },
        form_user: {
          userName: "",
          gender: "男",
          realName: "",
          role: "普通用户",
          status: "1",
          phone: "",
          email: "",
          password: "",
          userQq: "",
        },//新增 和 编辑 的数据
        dialogText: "",
        search: "",//搜索框
        search_select: "userName",//搜索框左侧下拉数据
        tableData: [],//表单数据源

      }
    },
    methods: {

      getTableDataSource() {
        this.globalMixin_request('/user_manage', "get", {
          currentPage: this.tableMixin_currentPage,
          pageSize: this.tableMixin_pageSize
        }).then(res => {
          const {code, data, message} = res;
          if (code === 10000) {
            this.tableData = data.data;
            this.tableMixin_total = data.total;


          }

        })
      }
    },
    created() {

      this.getTableDataSource();
    },
    mounted() {
    }
  }

</script>

<style lang="scss" scoped>
  .c-main /deep/ .el-select .el-input {
    width: 120px;
    text-align: center;
  }

  .c-main /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }


</style>
