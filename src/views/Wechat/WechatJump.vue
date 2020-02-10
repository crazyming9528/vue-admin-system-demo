<template>
  <div class="page_wrapper" v-show="pageMixin_showPage">


    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">微信落地页转换配置表</span>
          <span class="description">配置落地页等需要跳出微信的地址,防止微信屏蔽</span>
        </el-col>
      </el-row>


      <el-row class="panel_area">


        <el-col :span="24">
          <TableToolsBox :show-add="true" :show-chart="false" :show-down-load="false" @add="addFn"
                         @refresh="refresh" @search="searchFn">
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

              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form class="table-expand" label-position="left">
                    <el-form-item label="ID">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>

                    <el-form-item label="名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>

                    <el-form-item label="描述">
                      <span>{{ props.row.description }}</span>
                    </el-form-item>
                    <el-form-item label="处理方式">
                      <span>{{ props.row.type }}</span>
                    </el-form-item>

                    <el-form-item label="转换链接">
                      <span>{{ props.row.final_url }}</span>
                    </el-form-item>

                    <el-form-item label="最终跳转到的链接">
                      <span>{{ props.row.url }}</span>
                    </el-form-item>


                    <el-form-item label="修改时间">
                      <span>{{ props.row.update_time }}</span>
                    </el-form-item>


                    <el-form-item label="创建时间">
                      <span>{{ props.row.create_time }}</span>
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
                label="ID"
                prop="id"
                width="100"
              >
              </el-table-column>
              <el-table-column
                label="名称"
                prop="name"
              >
              </el-table-column>


              <el-table-column
                align="center"
                label="转换链接"
                prop="final_url"
              >
              </el-table-column>

              <el-table-column
                align="center"
                label="处理方式"
                prop="type"
              >
              </el-table-column>


              <el-table-column
                align="center"
                label="修改时间"
                prop="update_time"
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
                fixed="right"
                label="操作"
                width="100">

                <template slot-scope="scope">
                  <el-button @click="editFn(scope.row)" size="small" type="text">编辑</el-button>

                  <!--                              <el-button @click="openDialog('delete',scope.row)" size="small" type="text">删除</el-button>-->
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

    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="名称">
          <el-input auto-complete="off" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="描述">
          <el-input auto-complete="off" v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="要处理的链接">
          <el-input auto-complete="off" v-model="form.url"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="处理方式">
          <el-select placeholder="请选择处理方式" v-model="form.type">
            <el-option label="遮罩提示" value="1"></el-option>
            <el-option label="跳出微信" value="2"></el-option>
            <el-option label="不做处理" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="item_img" label="中间页图片：" v-if="form.type == 1">
          <el-upload
            :action="uploadUrl"
            :before-upload="beforeUpload"
            :headers="headers"
            :on-success="uploadSuccess"
            :show-file-list="false"
            class="avatar-uploader"
          >
            <div class="el-upload__tip" slot="tip">遮罩页面诱导图片</div>
            <img :src="form.imgurl" v-if="form.imgurl">
            <i class="el-icon-plus avatar-uploader-icon" v-else><span
              style="color: gray;padding: 0 12px">点击上传</span></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
        name: "WechatJump",
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
                uploadUrl: window.API_server.API_ADDRESS + "/single_upload",
                headers: {
                    Authorization: ''
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

                this.globalMixin_request('/get_search_parameters?type=wechat_jump', "get").then(res => {
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


                this.globalMixin_request('/wechat_jump', "get", {
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
                            item.final_url = "http://wechat.uyqart.com/wechat_web/jump.html?id=" + item.id;
                            if (item.type == 1) {
                                item.type = "遮罩提示";
                            }
                            if (item.type == 2) {
                                item.type = "跳出微信";
                            }
                            if (item.type == 3) {
                                item.type = "不做处理";
                            }

                            item.url = decodeURIComponent(item.url);
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

            addFn() {
                for (let p in this.form) {
                    if (this.form.hasOwnProperty(p)) {
                        this.form[p] = "";
                    }
                }
                this.form.type ='1';
                this.dialogFormVisible = true;
                this.dialogTitle = '新建';
            },
            editFn(data) {
                this.dialogFormVisible = true;
                this.dialogTitle = '编辑';
                this.editId = data.id;
                this.form.name = data.name;
                this.form.description = data.description;
                this.form.url = data.url;
                this.form.imgurl = data.imgurl;
                if (data.type === "遮罩提示") {
                    this.form.type = '1';
                }
                if (data.type === "跳出微信") {
                    this.form.type = '2';
                }
                if (data.type === "不做处理") {
                    this.form.type = '3';
                }


            },
            saveFn() {
                this.dialogFormVisible = false;

                if (this.dialogTitle === '新建') {
                    this.form.url = encodeURIComponent(this.form.url);
                    this.globalMixin_request('/wechat_jump', 'post', this.form).then(() => {
                        this.refresh();
                    })
                } else if (this.dialogTitle === '编辑') {
                    this.form.url = encodeURIComponent(this.form.url);
                    this.globalMixin_request('/wechat_jump/update?id=' + this.editId, 'put', this.form).then(() => {
                        this.refresh();
                    })

                }


            },
            /**
             * 重置页面
             */
            resetPage() {
                this.tableMixin_currentPage = 1;
                this.tableExpandArr = [];//清空 打开的row

            },

            beforeUpload(file) {
                const isPng = file.type === 'image/png';
                if (!isPng) {
                    this.$message.warning('只能上传图片哦!');
                }

            },
            uploadSuccess(response, file, fileList) {
                console.log(response, file, fileList);
                this.form.imgurl = response.data.path;
            },
        },
        created() {
            this.headers.Authorization = this.$store.getters.getOperatorInfo.token;
            this.getSearchParameters();
            this.getTableDataSource();
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
