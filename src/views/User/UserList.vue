<template>
  <div class="page_wrapper">


    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">用户列表</span>
          <span class="description">用户信息列表</span>
        </el-col>
      </el-row>


      <el-row class="panel_area">


        <el-col :span="24">
          <TableToolsBox :show-add="false" :show-chart="false" :show-down-load="true" @download="downloadFn()"
                         @refresh="refreshFn" @search="searchFn">
            <template slot="search">


              <el-select class="search_param" placeholder="请选择状态" style="width: 150px"
                         v-model="searchParameterRes.status">
                <el-option :key="index" :label="item.text"
                           :value="item.value"
                           v-for="(item,index) of this.searchParameterSource.status"></el-option>
              </el-select>

              <el-select class="search_param" placeholder="请选择性别" style="width: 150px"
                         v-model="searchParameterRes.gender">
                <el-option :key="index" :label="item.text"
                           :value="item.value"
                           v-for="(item,index) of this.searchParameterSource.gender"></el-option>
              </el-select>


              <el-input class="input-with-select search_param" clearable placeholder="请输入内容"
                        style="width: 250px"
                        v-model.trim="searchParameterRes.searchValue">
                <el-select placeholder="请选择" slot="prepend" style="width: 120px"
                           v-model="searchParameterRes.searchBy">
                  <el-option :key="index" :label="item.text"
                             :value="item.value "
                             v-for="(item,index) of this.searchParameterSource.searchBy"></el-option>
                </el-select>
              </el-input>
              <span>注册时间:</span>
              <el-date-picker
                align="right"
                class="search_param"
                end-placeholder="结束日期"
                range-separator="-"
                start-placeholder="开始日期"
                style="width: 250px"
                type="daterange"
                unlink-panels
                v-if="searchParameterRes.ai != 1"
                v-model="searchParameterRes.dateRange"
                value-format="timestamp">
              </el-date-picker>

            </template>
          </TableToolsBox>
        </el-col>
      </el-row>


      <el-row :gutter="20" class="panel_area">
        <el-col :span="24">
          <el-card class="box-card padding_none">
            <el-table
              v-loading="tableMixin_tableLoading"
              :data="tableData"
              :row-style="{cursor: 'pointer'}"
              @row-click="tableRowClickFn"
              @sort-change="tableSortFn"
              border
              row-key="user_id"
              stripe
              style="width: 100%"
            >

              <el-table-column
                align="center"
                label="#"
                type="index"
                width="50">
              </el-table-column>

              <el-table-column
                align="center"
                label="用户ID"
                prop="user_id"
                width="150">
              </el-table-column>

              <el-table-column
                align="center"
                label="用户头像"
                width="150"
              >
                <template slot-scope="scope">
                  <img :src="scope.row.avatar" alt="" style="width: 35%">
                </template>
              </el-table-column>


              <el-table-column

                label="用户昵称"
                min-width="150"
                prop="username"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="性别"
                prop="gender"
                width="100"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.gender| gender}} </span>
                </template>

              </el-table-column>


              <el-table-column
                align="center"
                label="手机号码"
                prop="tel"
                width="200"
              >
              </el-table-column>


              <el-table-column
                align="center"
                column-key="is_ban"
                label="状态"
                prop="is_ban"
                width="150"

              >
                <template slot-scope="scope">
                  <span>{{scope.row.status| status}} </span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="最后登录时间"
                prop="last_login_time"
                sortable="custom"
                width="180">
              </el-table-column>

              <el-table-column
                align="center"
                label="注册时间"
                prop="create_time"
                sortable="custom"
                width="180">
              </el-table-column>


              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="200">

                <template slot-scope="scope">
                  <el-button size="small" type="text">编辑</el-button>

                  <el-button size="small" type="text">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-card>


        </el-col>

      </el-row>

      <el-row class="panel_area">
        <el-pagination
          :current-page="tableMixin_currentPage"
          :page-size="tableMixin_pageSize"
          :page-sizes="tableMixin_pageSizeArr"
          :total="tableMixin_total"
          @current-change="tableMixin_handleCurrentChange"
          @size-change="tableMixin_handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-row>

    </div>

  </div>
</template>

<script>

    import {getSearchParameters} from "../../api/universal";
    import {getUserList} from "../../api/user"
    import pageMixin from "@/mixin/pageMixin";
    import tableMixin from "@/mixin/tableMixin";
    import TableToolsBox from "../../components/childComponents/TableToolsBox";

    export default {
        name: "UserList",
        components: {
            TableToolsBox,
        },
        mixins: [pageMixin, tableMixin],
        props: {},
        data() {
            return {
                loading: true,
                dialogTitle: "",
                editId: 0,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    name: '',
                    description: "",
                    url: "",
                    type: "1",
                    imgurl: "",
                },
                tableBatchOperation: [
                    {text: "删除", value: "delete"},
                    {text: "封禁", value: "ban"},
                    {text: "取消封禁", value: "cancelBan"}
                ],
                tableBatchOperate: "",
                tableData: [],//表格数据
                tableSort: {
                    sortBy: '',//通过该列的 字段 进行排序
                    sort: "desc",//排序方式
                },
                searchParameterSource: {
                    status: [],//状态 下拉框 数据源
                    searchBy: [],//搜索字段 下拉框 数据源
                    gender: [],
                },
                searchParameterRes: {
                    status: "",//状态
                    gender: "",//性别
                    searchBy: '',//通过该字段搜索
                    searchValue: '',//搜索值
                    dateRange: '',//时间区间
                },
                uploadUrl: window.API_server.API_ADDRESS + "/single_upload",
                headers: {
                    Authorization: ''
                },
                dialog: {
                    title: "",
                    display: false,
                },
                changeRole: {
                    uid: "",
                    username: "",
                    rid: "",
                },
            }
        },
        watch: {},
        computed: {},
        methods: {
            /**
             * 点击表格row  触发
             * @param row
             * @param column
             * @param event
             */
            tableRowClickFn(row, column, event) {
                console.log(row);
            },
            /**
             * 点击表格排序 触发
             * @param ob
             */
            tableSortFn(ob) {
                this.tableSort.sortBy = ob.prop;
                ob.order === 'ascending' ? this.tableSort.sort = 'asc' : this.tableSort.sort = 'desc';
                this.getTableDataSource();
            },

            /**
             * 表格批处理 执行程序
             */
            tableBatchFn() {

                if (this.tableBatchOperate === "" || this.tableMixin_multipleSelection.length === 0) {
                    this.ele_alert("请勾选要处理的数据并选择批量处理的操作类型！", 'warning');
                    return;
                }
                const idArr = this.tableMixin_multipleSelection.map(item => {
                    return item.uid;
                });
                switch (this.tableBatchOperate) {

                    case "delete":
                        this.deleteFn(idArr);
                        break;
                    case "ban":
                        this.changeOperatorStatusFn(idArr, "ban");
                        break;
                    case "cancelBan":
                        this.changeOperatorStatusFn(idArr, "cancelBan");
                        break;

                }

            },


            /**
             * 获取 搜索相关的参数 下拉框等的 待选值
             */
            getSearchParameters() {
                return new Promise((resolve, reject) => {
                    getSearchParameters("OperatorManage").then(res => {
                        const {data, code, message} = res.data;
                        if (code === 10000) {
                            this.searchParameterSource.searchBy = data.searchBy || [];
                            this.searchParameterRes.searchBy = this.searchParameterSource.searchBy[0] ? this.searchParameterSource.searchBy[0].value : ""; //设置下拉框默认选中第一个

                            this.searchParameterSource.status = data.status || [];
                            // this.searchParameterSource.status.unshift({text: "不限", value: ""});

                            this.searchParameterSource.gender = data.gender || [];

                            this.searchParameterSource.role = data.role || [];
                            // this.searchParameterSource.gender.unshift({text: "不限", value: ""})
                            resolve(true)
                        } else {
                            reject();
                        }

                    });


                });


            },
            /**
             * 获取表格数据
             */
            getTableDataSource() {

                this.tableMixin_tableLoading = true;
                return new Promise((resolve, reject) => {
                    getUserList({
                        searchBy: this.searchParameterRes.searchBy,
                        searchValue: this.searchParameterRes.searchValue,
                        startTime: this.searchParameterRes.dateRange[0],
                        endTime: this.searchParameterRes.dateRange[1],
                        sortBy: this.tableSort.sortBy,
                        sort: this.tableSort.sort,
                        status: this.searchParameterRes.status,
                        role: this.searchParameterRes.role,
                        currentPage: this.tableMixin_currentPage,
                        pageSize: this.tableMixin_pageSize,
                    }).then(res => {
                        const {data, code, message} = res.data;
                        if (code === 10000) {
                            this.tableData = data.data;
                            this.tableMixin_total = data.total;
                            resolve(true)
                        }
                    }).catch(error => {
                        reject(error);
                    }).finally(() => {
                        this.tableMixin_tableLoading = false;
                    })
                })


            },

            /**
             * 清除已选/已填写 的搜索参数
             */
            clearSearchParameterRes() {
                for (let p in this.searchParameterRes) {
                    if (this.searchParameterRes.hasOwnProperty(p)) {
                        this.searchParameterRes[p] = "";
                    }
                }

                // this.searchParameterRes.searchBy = this.searchParameterSource.searchBy[0].value; //设置下拉框默认选中第一个
            },
            /**
             ** 点击编辑 执行
             */
            editFn(row) {
                console.log(row.uid);
                this.ele_alert("无权编辑!", "warning");
            },
            /**
             ** 点击修改角色执行
             */
            roleFn(row) {
                console.log(row.uid);
                this.changeRole.uid = row.uid;
                this.changeRole.username = row.username;
                this.dialog.title = `修改 ${this.changeRole.username} 的角色`
                this.dialog.display = true;
            },
            /**
             * 改变操作员状态
             * */
            changeOperatorStatusFn(operator, type) {
                let arr = [];
                if (!Array.isArray(operator)) {
                    arr.push(operator.uid);
                    type = type[0] === true ? "cancelBan" : "ban";
                } else {
                    arr = operator;
                }

                const str = type === "cancelBan" ? "取消封禁" : "封禁";
                this.ele_confirm(`你确定${str}这${arr.length}个用户吗？`, "warning", () => {
                    this.getTableDataSource();
                })

            },
            /**
             * 点击编辑执行
             * */
            deleteFn(operator) {
                let arr = [];
                if (!Array.isArray(operator)) {
                    arr.push(operator.uid);
                } else {
                    arr = operator;
                }

                this.ele_confirm(`你确定删除这${arr.length}个用户吗？`, "warning", () => {
                    console.log("删除成功");
                    this.getTableDataSource();
                })
            },
            /**
             *  点击刷新执行
             */
            refreshFn() {
                this.tableMixin_resetCurrentPage();//分页 回到第一页
                this.clearSearchParameterRes();
                this.getData().then(res => {
                        console.log("网络请求成功");
                    }
                ).finally(() => {

                });
            },
            /**
             *  点击搜索 执行
             */
            searchFn() {
                this.tableMixin_resetCurrentPage();//分页 回到第一页
                this.getTableDataSource();
            },

            /**
             *  改变角色
             */
            changeRoleFn() {
                changeOperatorRole(this.changeRole.uid, this.changeRole.rid).then(res => {
                    const {data, code, message} = res.data;
                    if (code === 10000) {
                        this.ele_notify("修改角色成功", "success");
                        this.dialog.display = false;
                        this.getTableDataSource();
                    }
                })

            },

            /**
             * 获取数据
             */
            async getData() {
                this.loading = true;
                await this.getSearchParameters();
                await this.getTableDataSource();
            }

        },
        created() {

            this.getData().then(res => {
                    console.log("网络请求成功");
                }
            ).catch(e => {
                    console.log(e);
                }
            ).finally(() => {

            });

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

    .money_count {

      color: $baseColor2;

      b {
        color: gray;
        font-size: 30px;
        font-weight: normal;
      }

      h6 {
        font-weight: normal;
        color: $baseColor3;
      }

      li {
        color: gray;
        margin-bottom: 10px;
      }

    }


  }
</style>
