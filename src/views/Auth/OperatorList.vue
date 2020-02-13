<template>
  <div class="page_wrapper">

    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">操作员列表</span>
          <span class="description">{{this.$store.getters.systemInfo.title}} 用户管理</span>
        </el-col>
      </el-row>


      <el-row class="panel_area">


        <el-col :span="24">
          <TableToolsBox :show-add="true" :show-chart="false" :show-down-load="false"
                         @refresh="refreshFn" @search="searchFn">
            <template slot="search">


              <el-select class="search_param" placeholder="筛选角色" style="width: 150px"
                         v-model="searchParameterRes.role">
                <el-option :key="index" :label="item.role_name"
                           :value="item.rid"
                           v-for="(item,index) of this.searchParameterSource.role"></el-option>
              </el-select>

              <el-select class="search_param" placeholder="筛选性别" style="width: 150px"
                         v-model="searchParameterRes.gender">
                <el-option :key="index" :label="item.text"
                           :value="item.value"
                           v-for="(item,index) of this.searchParameterSource.gender"></el-option>
              </el-select>


              <el-select class="search_param" placeholder="筛选状态" style="width: 150px"
                         v-model="searchParameterRes.status">
                <el-option :key="index" :label="item.text"
                           :value="item.value"
                           v-for="(item,index) of this.searchParameterSource.status"></el-option>
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


            </template>
          </TableToolsBox>
        </el-col>
      </el-row>


      <el-row :gutter="20" class="panel_area">
        <el-col :span="24">
          <el-card class="box-card padding_none">
            <el-table
              :data="tableData"
              :row-style="{cursor: 'pointer'}"
              @row-click="tableRowClickFn"
              @selection-change="tableMixin_handleSelectionChange"
              @sort-change="tableSortFn"
              border
              row-key="id"
              stripe
              style="width: 100%"
              v-loading="tableMixin_tableLoading"
            >
              <el-table-column
                align="center"
                type="selection"
              >
              </el-table-column>
              <!--              <el-table-column-->
              <!--                align="center"-->
              <!--                label="#"-->
              <!--                type="index"-->
              <!--                width="50">-->
              <!--              </el-table-column>-->


              <el-table-column
                align="center"
                label="ID"
                prop="uid"
                width="100"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="用户名"
                prop="username"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="姓名"
                prop="real_name"
              >
              </el-table-column>

              <el-table-column
                align="center"
                label="角色"
                prop="role_name"
              >
              </el-table-column>


              <el-table-column
                align="center"
                label="最后一次登录IP"
                prop="last_login_ip"
                width="180">
              </el-table-column>

              <el-table-column
                align="center"
                label="最后一次登录时间"
                prop="last_login_time"
                sortable="custom"
                width="180">
              </el-table-column>

              <el-table-column
                align="center"
                label="创建时间"
                prop="create_time"
                sortable="custom"
                width="180">
              </el-table-column>
              <el-table-column
                align="center"
                label="状态"
                prop="status"
                width="200"
              >
                <template slot-scope="scope">
                  <el-switch

                    @change="changeOperatorStatusFn(scope.row,arguments)"
                    active-color="#13ce66"
                    active-text="正常"
                    inactive-color="#ff4949"
                    inactive-text="封禁"
                    v-model="scope.row.status">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="300">
                <template slot-scope="scope">
                  <el-button @click.stop="editFn(scope.row)" plain size="mini" type="primary">编辑</el-button>
                  <el-button @click.stop="roleFn(scope.row)" plain size="mini" type="primary">修改角色</el-button>
                  <el-button @click.stop="deleteFn(scope.row)" plain size="mini" type="danger">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-card>


        </el-col>


      </el-row>


      <el-row class="panel_area">
        <el-col :span="12">

          <span style="color: gray;font-size: 14px">批量操作:</span>
          <el-select placeholder="请选择批量操作" size="small" v-model="tableBatchOperate">
            <el-option :key="index" :label="item.text" :value="item.value"
                       v-for="(item,index) of tableBatchOperation"></el-option>
          </el-select>
          <el-button @click="tableBatchFn" size="small" type="primary">确定</el-button>
        </el-col>
        <el-col :span="12">
          <el-pagination
            :current-page="tableMixin_currentPage"
            :page-size="tableMixin_pageSize"
            :page-sizes="tableMixin_pageSizeArr"
            :total="tableMixin_total"
            @current-change="tableMixin_handleCurrentChange"
            @size-change="tableMixin_handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper"
            style="text-align: right">
          </el-pagination>
        </el-col>

      </el-row>


    </div>


    <el-dialog :close-on-click-modal="false" :title="dialog.title" :visible.sync="dialog.display">
      <el-form :model="form">
        <el-form-item label="请选择角色">
          <el-select class="search_param" placeholder="选择角色" style="width: 300px"
                     v-model="changeRole.rid">
            <el-option :key="index" :label="item.role_name"
                       :value="item.rid"
                       v-for="(item,index) of this.searchParameterSource.role"></el-option>
          </el-select>
          <el-button @click="changeRoleFn" type="primary">确 定</el-button>
          <el-button @click="dialog.display=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
    import pageMixin from "@/mixin/pageMixin";
    import tableMixin from "@/mixin/tableMixin";
    import TableToolsBox from "../../components/childComponents/TableToolsBox";

    import {changeOperatorRole, getOperatorList} from "../../api/operator"
    import {getSearchParameters} from "../../api/universal"

    export default {
        name: "OperatorList",
        components: {
            TableToolsBox,
        },
        mixins: [pageMixin, tableMixin],
        props: {},
        data() {
            return {
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
                    role: [],
                },
                searchParameterRes: {
                    status: "",//状态
                    gender: "",//性别
                    role: "",
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
                    getOperatorList(
                        this.tableMixin_currentPage,
                        this.tableMixin_pageSize,
                        this.tableSort.sortBy,
                        this.tableSort.sort,
                        this.searchParameterRes.status,
                        this.searchParameterRes.role,
                        this.searchParameterRes.searchBy,
                        this.searchParameterRes.searchValue,
                        this.searchParameterRes.dateRange[0],
                        this.searchParameterRes.dateRange[1]).then(res => {
                        const {data, code, message} = res.data;
                        if (code === 10000) {
                            this.tableData = data.data.map(res => {
                                res.status = res.status == "1";
                                return res;
                            });
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

  .item_img {
    img {
      max-width: 100%;
    }
  }

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
    width: 100%;
  }


  .page_wrapper {


  }
</style>
