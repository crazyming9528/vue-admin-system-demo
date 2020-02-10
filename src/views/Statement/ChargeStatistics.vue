<template>
  <div class="page_wrapper" v-show="pageMixin_showPage">


    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">充值统计</span>
          <span class="description">充值记录查询</span>
        </el-col>
      </el-row>


      <el-row class="panel_area">


        <el-col :span="24">
          <TableToolsBox :show-add="false" :show-chart="false" :show-down-load="true" @refresh="refresh"
                         @search="searchFn"
                         @download="downloadFn()">
            <template slot="search">

              <el-select class="search_param" placeholder=请选择状态 style="width: 150px"
                         v-model="searchParameterRes.status">
                <el-option :key="index" :label="item.text"
                           :value="item.value"
                           v-for="(item,index) of this.searchParameterSource.status"></el-option>
              </el-select>


              <el-select class="search_param" placeholder="请选择类目" style="width: 150px"
                         v-model="searchParameterRes.category">
                <el-option :key="index" :label="item.text"
                           :value="item.value"
                           v-for="(item,index) of this.searchParameterSource.category"></el-option>
              </el-select>


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
              row-key="order_id"
              stripe
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form class="table-expand" label-position="left">
                    <el-form-item label="ID">
                      <span>{{ props.row.order_id }}</span>
                    </el-form-item>
                    <el-form-item label="用户ID">
                      <el-button @click="globalMixin_jump('PlayerInfo',{user_id:props.row.user_id})" plain
                                 size="mini"
                                 type="primary">{{props.row.user_id}}</el-button>
                    </el-form-item>
                    <el-form-item label="用户昵称">
                      <span>{{ props.row.player_name }}</span>
                    </el-form-item>
                    <el-form-item label="商品ID">
                      <span>{{ props.row.goods_id }}</span>
                    </el-form-item>
                    <el-form-item label="商品名称">
                      <span>{{ props.row.goods_tip_name }}</span>
                    </el-form-item>
                    <el-form-item label="商品大类">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>

                    <el-form-item label="用户昵称">
                      <span>{{ props.row.player_name }}</span>
                    </el-form-item>
                    <el-form-item label="充值金额">
                      <span>{{ props.row.order_amount }}</span>
                    </el-form-item>
                    <el-form-item label="充值状态">
                      <span>{{ props.row.order_status }}</span>
                    </el-form-item>
                    <el-form-item label="充值货币">
                      <span>{{ props.row.money_type }}</span>
                    </el-form-item>

                    <el-form-item label="充值渠道">
                      <span>{{ props.row.pay_channel }}</span>
                    </el-form-item>

                    <el-form-item label="获得金币">
                      <span>{{ props.row.gold }}</span>
                    </el-form-item>
                    <el-form-item label="获得钻石">
                      <span>{{ props.row.diamond }}</span>
                    </el-form-item>
                    <el-form-item label="充值时间">
                      <span>{{ props.row.add_time }}</span>
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


              <!--              <el-table-column-->
              <!--                label="ID"-->
              <!--                prop="id"-->
              <!--              ></el-table-column>-->
              <!--                          <el-table-column-->
              <!--                            label="用户ID"-->
              <!--                            prop="user_id"-->
              <!--                          >-->
              <!--                          </el-table-column>-->
              <!--              <el-table-column-->

              <!--                label="用户昵称"-->
              <!--                prop="player_name"-->
              <!--              >-->
              <!--              </el-table-column>-->
              <!--              <el-table-column-->

              <!--                align="center"-->
              <!--                label="商品ID"-->
              <!--                prop="goods_id"-->

              <!--              >-->
              <!--              </el-table-column>-->
              <el-table-column

                align="center"
                label="商品名称"
                prop="goods_tip_name"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="商品大类"
                prop="category"
                width="100"

              >
              </el-table-column>

              <el-table-column

                label="用户昵称"
                prop="player_name"

              >
              </el-table-column>
              <el-table-column
                align="center"
                label="充值金额"
                prop="order_amount"
                sortable="custom"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="充值状态"
                prop="order_status"
              >
              </el-table-column>
              <!--              <el-table-column-->
              <!--                align="center"-->
              <!--                label="充值货币"-->
              <!--                prop="money_type"-->
              <!--              >-->
              <!--              </el-table-column>-->
              <!--              <el-table-column-->
              <!--                align="center"-->
              <!--                label="充值渠道"-->
              <!--                prop="pay_channel"-->
              <!--              >-->
              <!--              </el-table-column>-->
              <el-table-column
                align="center"
                column-key="gold"
                label="获得金币"
                prop="gold"


              >
              </el-table-column>

              <el-table-column
                align="center"
                column-key="gold"
                label="获得钻石"
                prop="diamond"

              >
              </el-table-column>


              <el-table-column
                align="center"
                label="充值时间"
                prop="add_time"
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

  export default {
    name: "ChargeStatistics",
    components: {
      TableToolsBox,
    },
    mixins: [pageMixin, tableMixin],
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
          category: [],//分类 下拉框 数据源
          searchBy: [],//搜索字段 下拉框 数据源
          status: []//状态
        },
        searchParameterRes: {
          category: "",//分类
          searchBy: '',//通过该字段搜索
          searchValue: '',//搜索值
          dateRange: '',//时间区间
          status: '',//状态
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
        if (this.tableExpandArr.indexOf(row.order_id) === -1) {
          this.tableExpandArr = [];
          this.tableExpandArr.push(row.order_id)
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

        this.globalMixin_request('/charge_statistics_search_parameters', "get").then(res => {
          const {code, data, message} = res;
          if (code === 10000) {
            this.searchParameterSource.category = data.category || [];
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


        this.globalMixin_request('/charge_statistics', "get", {
          searchBy: this.searchParameterRes.searchBy,
          category: this.searchParameterRes.category,
          status: this.searchParameterRes.status,
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
            this.tableData = data.data;
            this.tableMixin_total = data.total;
            this.addition = addition;

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
       * 导出表格
       **/
      downloadFn() {

        const startTime = this.searchParameterRes.dateRange[0];
        const endTime = this.searchParameterRes.dateRange[1];

        if (startTime && endTime) {
          this.ele_notify('稍等 表格开始导出');
          window.location.href = window.API_server.API_ADDRESS + '/export_csv?type=charge_statistics&startTime=' + startTime + '&endTime=' + endTime + '&token=' + encodeURIComponent(this.$store.getters.getOperatorInfo.token);

        } else {

          this.ele_alert('请先选择时间区间再导出', 'warning');


        }

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
