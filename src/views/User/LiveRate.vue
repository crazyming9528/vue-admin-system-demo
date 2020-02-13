<template>
  <div class="page_wrapper">


    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">用户留存</span>
          <span class="description">用户注册后留存情况统计</span>
        </el-col>
      </el-row>


      <el-row class="panel_area">

        <el-col :span="24">
          <TableToolsBox :show-add="false" :show-chart="false" :show-down-load="false"
                         @refresh="refresh" @search="searchFn">
            <template slot="search">
              <span>用户注册时间:</span>
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
              :cell-style="getCellStyle"
              :data="tableData"
              :row-style="{cursor: 'pointer'}"
              :v-loading="tableMixin_tableLoading"
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
                label="用户注册日期"
                prop="date"
                sortable="custom"
                width="150"
              >
                <template slot-scope="scope">
                  <div
                    class="table_value">
                    {{scope.row.date | formatDate("YYYY-MM-DD")}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="次日留存"
                prop="day1"
                sortable="custom"
              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day1 == null ? 'white' : `rgba(30,144,255,${scope.row.day1/100})`}"
                    class="table_value">
                    {{ scope.row.day1 == null ? "暂无数据" :scope.row.day1+'%'}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                label="2日留存"
                prop="day2"
                sortable="custom"
              >

                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day2 == null ? 'white' : `rgba(30,144,255,${scope.row.day2/100})`}"
                    class="table_value">
                    {{ scope.row.day2 == null ? "暂无数据" :scope.row.day2+'%'}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                label="3日留存"
                prop="day3"
                sortable="custom"

              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day3 == null ? 'white' : `rgba(30,144,255,${scope.row.day3/100})`}"
                    class="table_value">
                    {{ scope.row.day3 == null ? "暂无数据" :scope.row.day3+'%'}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                label="4日留存"
                prop="day4"
                sortable="custom"

              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day4 == null ? 'white' : `rgba(30,144,255,${scope.row.day4/100})`}"
                    class="table_value">
                    {{ scope.row.day4 == null ? "暂无数据" :scope.row.day4+'%'}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column

                align="center"
                label="5日留存"
                prop="day5"
                sortable="custom"

              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day5 == null ? 'white' : `rgba(30,144,255,${scope.row.day5/100})`}"
                    class="table_value">
                    {{ scope.row.day5 == null ? "暂无数据" :scope.row.day5+'%'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column

                align="center"
                label="6日留存"
                prop="day6"
                sortable="custom"

              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day6 == null ? 'white' : `rgba(30,144,255,${scope.row.day6/100})`}"
                    class="table_value">
                    {{ scope.row.day6 == null ? "暂无数据" :scope.row.day6+'%'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column

                align="center"
                label="7日留存"
                prop="day7"
                sortable="custom"

              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day7 == null ? 'white' : `rgba(30,144,255,${scope.row.day7/100})`}"
                    class="table_value">
                    {{ scope.row.day7 == null ? "暂无数据" :scope.row.day7+'%'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column

                align="center"
                label="15日留存"
                prop="day15"
                sortable="custom"

              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day15 == null ? 'white' : `rgba(30,144,255,${scope.row.day15/100})`}"
                    class="table_value">
                    {{ scope.row.day15 == null ? "暂无数据" :scope.row.day15+'%'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column

                align="center"
                label="30日留存"
                prop="day30"
                sortable="custom"

              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day30 == null ? 'white' : `rgba(30,144,255,${scope.row.day30/100})`}"
                    class="table_value">
                    {{ scope.row.day30 == null ? "暂无数据" :scope.row.day30+'%'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column

                align="center"
                label="60日留存"
                prop="day60"
                sortable="custom"
              >
                <template slot-scope="scope">
                  <div
                    :style="{backgroundColor:scope.row.day60 == null ? 'white' : `rgba(30,144,255,${scope.row.day60/100})`}"
                    class="table_value">
                    {{ scope.row.day60 == null ? "暂无数据" :scope.row.day60+'%'}}
                  </div>
                </template>
              </el-table-column>


<!--              <el-table-column-->
<!--                align="center"-->
<!--                fixed="right"-->
<!--                label="平均生命天数"-->
<!--                width="150">-->

<!--                <template slot-scope="scope">-->
<!--                  <div> {{scope.row.avg_life.toFixed(2)}}</div>-->
<!--                </template>-->

<!--              </el-table-column>-->

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
    import CountUp from "@/components/childComponents/CountUp";
    import pageMixin from "@/mixin/pageMixin";
    import tableMixin from "@/mixin/tableMixin";
    import TableToolsBox from "@/components/childComponents/TableToolsBox";
    import EchartComponent from "@/components/childComponents/echartComponent";
    import {liveRate} from '../../api/user';

    export default {
        name: "LiveRate",
        components: {
            EchartComponent,
            TableToolsBox,
            CountUp
        },
        mixins: [pageMixin, tableMixin],
        props: {},
        data() {
            return {
                liveRateEchartOption: null,
                tableData: [],//表格数据
                // tableExpandArr: [],//表格要展开的列
                tableSort: {
                    sortBy: '',//通过该列的 字段 进行排序
                    sort: "desc",//排序方式
                },
                searchParameterSource: {},
                searchParameterRes: {
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
                // this.$router.push({name: 'PlayerInfo', query: {user_id: row.user_id}});
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
             * 获取表格数据
             */
            getTableDataSource() {
                this.tableMixin_tableLoading = true;
                liveRate({
                    startTime: this.searchParameterRes.dateRange[0],
                    endTime: this.searchParameterRes.dateRange[1],
                    sortBy: this.tableSort.sortBy,//排序字段
                    sort: this.tableSort.sort,//排序规则
                    currentPage: this.tableMixin_currentPage,
                    pageSize: this.tableMixin_pageSize

                }).then(res => {
                    const {code, data, message, addition} = res.data;
                    if (code === 10000) {

                        console.log(data.data);
                        this.tableData = data.data;
                        this.tableMixin_total = data.total;
                    }

                }).finally(() => {
                    this.tableMixin_tableLoading = false;
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

            },
            /**
             * 刷新
             */
            refresh() {
                this.tableMixin_resetCurrentPage();//分页 回到第一页
                this.clearSearchParameterRes();
                this.getTableDataSource();

            },
            /**
             * 执行搜索
             */
            searchFn() {
                this.tableMixin_resetCurrentPage();//分页 回到第一页
                this.getTableDataSource();
            },
            /**
             * 导出表格
             **/
            downloadFn() {

            },

            getCellStyle(o) {
                return {
                    padding: "0",
                }
            }

        },
        created() {
            this.getTableDataSource();
        },

    }
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/base";


  .page_wrapper {

    .table_value {
      height: 45px;
      line-height: 45px;
      margin: 0 -10px
    }

    .echart_wrapper {
      background-color: #626262;
      width: 100%;
      height: 400px;
    }


  }
</style>
