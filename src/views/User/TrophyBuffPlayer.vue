<template>
  <div class="page_wrapper" v-show="pageMixin_showPage">


    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">加成用户列表</span>
          <span class="description">加成用户列表</span>
        </el-col>
      </el-row>


      <el-row class="panel_area">


        <el-col :span="24">
          <TableToolsBox :show-add="false" :show-chart="false" :show-down-load="false" @refresh="refresh"
                         @search="searchFn">
            <template slot="search">


              <el-input class="input-with-select search_param" clearable placeholder="请输入内容"
                        style="width: 250px"
                        v-model.trim="searchParameterRes.searchValue">
                <el-select placeholder="请选择" slot="prepend" style="width: 120px"
                           v-model="searchParameterRes.searchBy">
                  <el-option :key="index" :label="item.text"
                             :value="item.value "
                             v-for="(item,index) of this.searchParameterSource.searchBy"></el-option>
                  <!--                  <el-option label="用户id" value="userid"></el-option>-->
                  <!--                  <el-option label="用户名" value="username"></el-option>-->
                </el-select>
              </el-input>
              修改时间:
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
              :row-style="{cursor: 'pointer'}"
              @row-click="tableRowClickFn"
              @sort-change="tableSortFn"
              border
              row-key="id"
              stripe
              style="width: 100%"
            >

              <el-table-column
                align="center"
                label="#"
                type="index"
                width="50">
              </el-table-column>


              <!--              <el-table-column-->
              <!--                label="ID"-->
              <!--                prop="id"-->
              <!--              ></el-table-column>-->

              <el-table-column

                label="用户ID"
                prop="user_id"
              >

              </el-table-column>
              <el-table-column
                label="用户昵称"
                prop="player_name"
              >
              </el-table-column>
              <!--            <el-table-column-->
              <!--              align="center"-->
              <!--              label="OPENID"-->
              <!--              prop="re_openid"-->

              <!--            >-->
              <!--            </el-table-column>-->

              <el-table-column
                align="center"
                label="奖杯加成"
                prop="lottery_buff"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="游戏场次"
                prop="play_times"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="充值金额"
                prop="all_charge"
                sortable="custom"


              >
              </el-table-column>
              <el-table-column
                align="center"
                label="抽奖获得奖杯"
                prop="all_lottery"
                sortable="custom"

              >
              </el-table-column>

              <el-table-column
                align="center"
                label="注册时间"
                prop="reg_time"

                width="180">
              </el-table-column>

              <el-table-column
                align="center"
                label="最后一次登录时间"
                prop="login_time"
                sortable="custom"
                width="180">
              </el-table-column>


              <el-table-column
                align="center"
                label="操作人"
                prop="operator_name"
                width="200"
              >
              </el-table-column>


              <el-table-column
                align="center"
                label="修改时间"
                prop="update_time"
                sortable="custom"
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

  </div>
</template>

<script>
  import pageMixin from "@/mixin/pageMixin";
  import tableMixin from "@/mixin/tableMixin";
  import TableToolsBox from "../../components/childComponents/TableToolsBox";
  import moment from 'moment'

  export default {
    name: "TrophyBuffPlayer",
    components: {
      TableToolsBox,
    },
    mixins: [pageMixin, tableMixin],
    props: {},
    data() {
      return {
        tableData: [],//表格数据
        tableExpandArr: [],
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
        this.$router.push({name: 'PlayerInfo', query: {user_id: row.user_id}});

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

        this.globalMixin_request('/trophy_buff_player_search_parameters', "get").then(res => {
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


        this.globalMixin_request('/trophy_buff_player', "get", {
          searchBy: this.searchParameterRes.searchBy,
          searchValue: this.searchParameterRes.searchValue,
          startTime: this.searchParameterRes.dateRange[0],
          endTime: this.searchParameterRes.dateRange[1],
          sortBy: this.tableSort.sortBy,//排序字段
          sort: this.tableSort.sort,//排序规则
          currentPage: this.tableMixin_currentPage,
          pageSize: this.tableMixin_pageSize
        }).then(res => {
          const {code, data, message, addition} = res;
          if (code === 10000) {
            this.tableData = data.data.map((item) => {
              console.log(item.update_time);
              item.update_time = moment(item.update_time*1000).format('YYYY-MM-DD HH:mm:ss');
              return item;
            })
            this.tableMixin_total = data.total;
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

        this.searchParameterRes.searchBy = this.searchParameterSource.searchBy[0].value; //设置下拉框默认选中第一个
      },
      /**
       * 刷新
       */
      refresh() {
        this.resetPage();
        this.clearSearchParameterRes();
        this.getSearchParameters();
        this.getTableDataSource();
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

      },
    },
    created() {
      this.getSearchParameters();
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
