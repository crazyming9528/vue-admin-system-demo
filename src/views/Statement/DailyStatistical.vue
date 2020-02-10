<template>
  <div class="page_wrapper" v-show="pageMixin_showPage" >

      <el-row class="panel_area">


        <el-col :span="24">
          <TableToolsBox :show-add="false" :show-chart="false" :show-down-load="false" @refresh="refresh"
                         @search="searchFn">
            <template slot="search">

              <el-date-picker
                align="right"
                class="search_param"
                end-placeholder="结束日期"
                range-separator="-"
                start-placeholder="开始日期"
                style="width: 250px"
                type="daterange"
                unlink-panels
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
              :data="tableData"
              :expand-row-keys="tableExpandArr"
              :row-style="{cursor: 'pointer'}"
              @row-click="tableRowClickFn"
              @sort-change="tableSortFn"
              border
              row-key="id"
              stripe
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form class="table-expand" label-position="left">
                    <el-form-item label="ID">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="日期">
                      <span>{{ props.row.date }}</span>
                    </el-form-item>
                    <el-form-item label="新增用户">
                      <span>{{ props.row.new_user }}</span>
                    </el-form-item>
                    <el-form-item label="有效注册">
                      <span>{{ props.row.effective_reg }}</span>
                    </el-form-item>
                    <el-form-item label="登录用户">
                      <span>{{ props.row.login_user }}</span>
                    </el-form-item>
                    <el-form-item label="充值人数">
                      <span>{{ props.row.charge_user }}</span>
                    </el-form-item>
                    <el-form-item label="充值次数">
                      <span>{{ props.row.charge_times }}</span>
                    </el-form-item>
                    <el-form-item label="充值总额">
                      <span>{{ props.row.charge_count }}</span>
                    </el-form-item>

                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="#"
                type="index"
                width="50">
              </el-table-column>

              <el-table-column

                align="center"
                label="日期"
                prop="date"
                sortable="custom"
                width="180"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="新增用户"
                prop="new_user"

              >
              </el-table-column>
              <el-table-column

                align="center"
                label="登录用户"
                prop="login_user"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="充值人数"
                prop="charge_user"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="充值次数"
                prop="charge_times"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="充值总额"
                prop="charge_count"

              >
              </el-table-column>
              <!--                <el-table-column-->
              <!--                  align="center"-->
              <!--                  label="发放奖杯"-->
              <!--                  prop="sent_wincup"-->

              <!--                >-->
              <!--                </el-table-column>-->
              <!--                <el-table-column-->
              <!--                  align="center"-->
              <!--                  label="奖杯兑换实物"-->
              <!--                  prop="convert_entity"-->

              <!--                >-->
              <!--                </el-table-column>-->

              <!--                <el-table-column-->
              <!--                  align="center"-->
              <!--                  label="奖杯兑换金币"-->
              <!--                  prop="convert_gold"-->

              <!--                >-->
              <!--                </el-table-column>-->

              <!--                <el-table-column-->
              <!--                  align="center"-->
              <!--                  label="奖杯兑换钻石"-->
              <!--                  prop="convert_diamond"-->

              <!--                >-->
              <!--                </el-table-column>-->

              <!--              <el-table-column-->
              <!--                align="center"-->
              <!--                label="用户奖杯库存总额"-->
              <!--                prop="user_wincup"-->

              <!--              >-->
              <!--              </el-table-column>-->

              <!--              <el-table-column-->
              <!--                align="center"-->
              <!--                label="用户金币库存总额"-->
              <!--                prop="user_gold"-->

              <!--              >-->
              <!--              </el-table-column>-->


              <!--              <el-table-column-->
              <!--                align="center"-->
              <!--                label="用户钻石库存总额"-->
              <!--                prop="user_diamond"-->

              <!--              >-->
              <!--              </el-table-column>-->


              <el-table-column
                align="center"
                label="统计执行时间"
                prop="create_time"
                width="180">
              </el-table-column>


              <!--            <el-table-column-->
              <!--              align="center"-->
              <!--              fixed="right"-->
              <!--              label="操作"-->
              <!--              width="100">-->

              <!--              <template slot-scope="scope">-->
              <!--                <el-button @click="openDialog('edit',scope.row)" size="small" type="text">编辑</el-button>-->

              <!--                <el-button @click="openDialog('delete',scope.row)" size="small" type="text">删除</el-button>-->
              <!--              </template>-->
              <!--            </el-table-column>-->

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
</template>

<script>
    import pageMixin from "@/mixin/pageMixin";
    import tableMixin from "@/mixin/tableMixin";
    import TableToolsBox from "../../components/childComponents/TableToolsBox";
    import moment from 'moment'

    export default {
        name: "DailyStatistical",
        components: {
            TableToolsBox,
        },
        mixins: [pageMixin,tableMixin],
        props: {},
        data() {
            return {
                tableData: [],//表格数据
                tableExpandArr: [],//表格要展开的列
                tableSort: {
                    sortBy: '',//通过该列的 字段 进行排序
                    sort: "desc",//排序方式
                },
                searchParameterSource: {
                    status: [],//状态 下拉框 数据源
                    searchBy: [],//搜索字段 下拉框 数据源
                },
                searchParameterRes: {
                    status: "",//状态
                    searchBy: '',//通过该字段搜索
                    searchValue: '',//搜索值
                    dateRange: '',//时间区间
                },
                addition: {
                    currentMoney: 0,
                    allStatusMoney: [],
                    allMoney: 0
                }//一些附带参数   金额统计用的
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
                if (this.tableExpandArr.indexOf(row.id) === -1) {
                    this.tableExpandArr = [];
                    this.tableExpandArr.push(row.id)
                } else {
                    this.tableExpandArr = [];
                }

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
             * 获取 搜索相关的参数 下拉框等的 待选值
             */
            getSearchParameters() {

                this.globalMixin_request('/_search_parameters', "get").then(res => {
                    const {code, data, message} = res;
                    if (code === 10000) {
                        this.searchParameterSource.status = data.status || [];
                        this.searchParameterSource.searchBy = data.searchBy || [];
                        this.searchParameterRes.searchBy = this.searchParameterSource.searchBy[0].value; //设置下拉框默认选中第一个
                    }

                })


            },
            /**
             * 获取表格数据
             */
            getTableDataSource() {


                this.globalMixin_request('/ds_index', "get", {
                    // searchBy: this.searchParameterRes.searchBy,
                    // status: this.searchParameterRes.status,
                    // searchValue: this.searchParameterRes.searchValue,
                    startTime: this.searchParameterRes.dateRange[0],
                    endTime: this.searchParameterRes.dateRange[1],
                    sortBy: this.tableSort.sortBy,//排序字段
                    sort: this.tableSort.sort,//排序规则
                    currentPage: this.tableMixin_currentPage,
                    pageSize: this.tableMixin_pageSize
                }).then(res => {
                    const {code, data, message, addition} = res;
                    if (code === 10000) {
                        this.tableData = data.data;
                        this.tableMixin_total = data.total;
                        this.addition = addition;
                        this.tableData.forEach(item => {
                            item.date = moment(item.date).format('YYYY-MM-DD');

                        });

                    }

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
             * 刷新
             */
            refresh() {
                this.resetPage();
                this.clearSearchParameterRes();
                this.getTableDataSource();
                // this.getSearchParameters();

            },
            /**
             * 执行搜索
             */
            searchFn() {
                this.resetPage();
                this.getTableDataSource();
            },
            /**
             * 重置页面
             */
            resetPage() {
                this.tableMixin_currentPage = 1;
                this.tableExpandArr = [];//清空 打开的row

            }
        },
        created() {
            // this.getSearchParameters();
            this.getTableDataSource();
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


  }
</style>
