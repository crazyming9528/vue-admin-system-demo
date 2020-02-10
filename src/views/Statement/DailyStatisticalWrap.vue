<template>
  <div class="page_wrapper">
    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">每日汇总统计</span>
          <span class="description">每日汇总统计记录查询</span>
        </el-col>
      </el-row>
      <el-row class="panel_area">
        <el-tabs @tab-click="handleClick" type="card" v-model="activeName">
          <el-tab-pane label="综合汇总统计" name="first">
            <daily-statistical></daily-statistical>
          </el-tab-pane>
          <el-tab-pane label="商品销售汇总" name="second">商品销售汇总</el-tab-pane>
          <el-tab-pane label="用户登录汇总" name="third">用户登录汇总</el-tab-pane>
        </el-tabs>
      </el-row>
    </div>

  </div>
</template>

<script>
    // import pageMixin from "@/mixin/pageMixin";
    import DailyStatistical from "./DailyStatistical";

    export default {
        name: "DailyStatisticalWrap",
        components: {
            DailyStatistical
        },
        // mixins: [pageMixin],
        props: {},
        data() {
            return {
                activeName: "first"
            }
        },
        watch: {},
        computed: {},
        methods: {
            handleClick() {

            }
        },
        created() {

        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>
  .page_wrapper {

   & /deep/  .el-tabs__nav-scroll {
     position: relative;
     height: 60px;

     & /deep/ .el-tabs__nav {
       position: absolute;
       bottom: 0;
       left: 50%;
       transform: translateX(-50%)!important;

      }
    }

  }
</style>
