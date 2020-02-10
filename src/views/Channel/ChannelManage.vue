<template>
  <div class="page_wrapper" v-show="pageMixin_showPage">


    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">渠道设置</span>
          <span class="description">新增、修改渠道</span>
        </el-col>
      </el-row>


      <el-row class="panel_area">


        <el-col :span="24">
          <TableToolsBox  :show-search="false" :show-add="true" :show-chart="false" :show-down-load="false" @add="addFn"
                         @refresh="refresh" @search="searchFn">
            <template slot="search">


            </template>
          </TableToolsBox>
        </el-col>
      </el-row>

      <el-row :gutter="30" class="panel_area"  type="flex"  style="flex-wrap: wrap">
        <el-col
          :key="index"
          :lg="6"
          :md="12"
          :sm="12" :span="6" :xl="6" :xs="24"
          v-for="(item,index) of channelData"
          style="margin-bottom: 30px"
        >

          <el-card class="box-card " >
            <div class="clearfix" slot="header" style="width: 100%">
              <span style="color: gray">渠道名:</span> <span class="font-color-blue" style="font-weight: bold">{{item.name}}</span>
              <el-button @click="deleteFn(index)" style="float: right; padding: 3px 0;margin-left: 15px" type="text"><i
                class="el-icon-delete"></i>删除
              </el-button>
              <el-button @click="item.edit=true" style="float: right; padding: 3px 0;margin-left: 15px"
                         type="text"
                         v-show="!item.edit"><i class="el-icon-edit"></i>编辑
              </el-button>
              <el-button @click="item.edit=false" style="float: right; padding: 3px 0;margin-left: 15px"
                         type="text"
                         v-show="item.edit">取消编辑
              </el-button>
            </div>
            <div class="text"><span style="color: gray">渠道描述:</span>
              <div class="description" style="margin: 15px 0" v-show="!item.edit">{{item.description}}</div>
              <div v-show="item.edit"><textarea  name="" rows="5"
                                                style="width: 100%;border: 1px solid #dedede;padding: 5px;box-sizing: border-box"
                                                v-model="item.description"></textarea>
                <el-button @click="updateFn(index)" size="mini" type="primary">保存</el-button>
              </div>

            </div>
          </el-card>


        </el-col>
      </el-row>


    </div>

    <el-dialog :append-to-body="true"
               :close-on-click-modal="false"
               :title="dialogTitle"
               :visible.sync="dialogVisible">
      <div class="dialog_wrap">
        <el-form>
          <el-form-item>
            渠道名:
            <el-input
              clearable
              placeholder="请输入渠道名"
              v-model.trim="dialogValue.name">
            </el-input>
            <span style="color: red">注意:渠道名设置后不可修改(渠道名只能输入英文字母和数字)</span>
          </el-form-item>


          <el-form-item>
            描述:
            <el-input
              clearable
              placeholder="请输入渠道描述"
              type="text"
              v-model.trim="dialogValue.description">
            </el-input>

          </el-form-item>


        </el-form>

      </div>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="saveFn" type="primary">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
    import pageMixin from "@/mixin/pageMixin";
    import tableMixin from "@/mixin/tableMixin";
    import TableToolsBox from "../../components/childComponents/TableToolsBox";

    export default {
        name: "ChannelManage",
        components: {
            TableToolsBox,
        },
        mixins: [pageMixin, tableMixin],
        props: {},
        data() {
            return {
                dialogTitle: "",
                dialogVisible: false,
                dialogValue: {
                    name: '',
                    description: ""
                },
                tableData: [],//表格数据
                channelData: [],
                tableExpandArr: [],
                tableSort: {
                    sortBy: '',//通过该列的 字段 进行排序
                    sort: "desc",//排序方式
                },
                searchParameterSource: {
                    status: [],//状态 下拉框 数据源
                    searchBy: [],//搜索字段 下拉框 数据源
                    channel: [],
                },
                searchParameterRes: {
                    channel: "",//状态
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

                this.globalMixin_request('/app_channel_search_parameters', "get").then(res => {
                    const {code, data, message} = res;
                    if (code === 10000) {
                        this.searchParameterSource.status = data.status || [];
                        this.searchParameterSource.channel = data.channel || [];
                        this.searchParameterSource.searchBy = data.searchBy || [];
                        this.searchParameterRes.searchBy = this.searchParameterSource.searchBy[0].value; //设置下拉框默认选中第一个
                    }

                })


            },
            /**
             * 获取表格数据
             */
            getChannelDataSource() {


                this.globalMixin_request('/app_channel', "get", {}).then(res => {
                    const {code, data, message, addition} = res;
                    if (code === 10000) {
                        this.channelData = data.map(item => {
                            item.edit = false;// 添加一个编辑 属性  默认false  表示为  未编辑状态
                            return item;
                        })
                    }

                })

            },

            updateFn(index) {

                this.channelData[index].edit = false;
                this.globalMixin_request('/app_channel/update', 'put', {
                    id: this.channelData[index].id,
                    description: this.channelData[index].description
                }).then(res => {
                    const {code, data, message, addition} = res;
                    if (code === 10000) {
                        this.ele_notify('更新成功', 'success');
                        this.getChannelDataSource();
                    }

                })

            },
            deleteFn(index) {
                this.ele_alert('不可删除!', 'warning');
            },
            addFn() {

                this.dialogTitle = `新增渠道`;
                this.dialogVisible = true;

            },
            saveFn() {

                this.globalMixin_request('/app_channel', 'post', {
                    name: this.dialogValue.name,
                    description: this.dialogValue.description,
                }).then(res => {
                    const {code, data, message, addition} = res;
                    if (code === 10000) {
                        this.dialogValue.name = this.dialogValue.description = '';
                        this.ele_notify('添加渠道成功', 'success');
                        this.dialogVisible = false;
                        this.getChannelDataSource();
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
                // this.clearSearchParameterRes();
                // this.getSearchParameters();
                this.getChannelDataSource();
            },
            /**
             * 执行搜索
             */
            searchFn() {
                this.resetPage();
                if (!this.searchParameterRes.channel) {
                    this.ele_alert('请选择渠道');
                    return;
                }
                this.getChannelDataSource();
            },
            /**
             * 重置页面
             */
            resetPage() {


            },
        },
        created() {

            this.getChannelDataSource();
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
