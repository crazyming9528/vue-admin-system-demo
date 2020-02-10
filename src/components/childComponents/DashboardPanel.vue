<template>
  <div class="dashboard_panel">
    <div class="top_bar">
      <div class="title">{{title}}</div>
      <div class="tools">
        <!--        <el-icon class="tools_btn el-icon-refresh"></el-icon>-->
        <!--        <el-icon class="tools_btn el-icon-refresh"></el-icon>-->
        <!--        <el-icon class="tools_btn el-icon-refresh"></el-icon>-->
        <el-button @click="refresh" class="tools_btn"><i class="el-icon-refresh"></i></el-button>
      </div>
    </div>
    <div class="dashboard_panel_content">
      <slot>
    <div style="text-align: center;opacity: .8;font-size: 14px;width: 100%;margin-top: 15px">    加载中...</div>
      </slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DashboardPanel",
        components: {},
        props: {
            title: {
                type: String,
                required: false,
            },
        },
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
            refresh() {
                this.$emit("refresh","sole");
            }
        },
        created() {
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>
  .dashboard_panel {
    box-shadow: 0 0 1px 0 #62d2df;
    border: 2px #0d2337 solid;
    height: auto;
    margin-bottom: 15px;

    .top_bar {
      width: 100%;
      background-color: #072644;
      background-image: linear-gradient(top, #072644, #040f1a);
      display: flex;
      justify-content: space-between;
      font-size: 0.18px;
      height: 30px;

      .title {
        height: 28px;
        line-height: 28px;
        margin: 0;
        border-left: 5px solid #099ab8;
        padding-left: 8px;

      }

      .tools {
        height: 28px;
        line-height: 28px;
        border-right: 5px solid #099ab8;
        padding-right: 8px;
        margin: 0;
        flex: 1;
        display: flex;
        justify-content: flex-end;

        .tools_btn {
          cursor: pointer;
          width: 20px;
          height: 28px;
          line-height: 28px;
          border: none;
          background-color: transparent;
          position: relative;
          display: block;

          i{

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            color: white;
            transition: all .5s;
            &:hover{
              color: #1e7c88;
            }


          }
        }
      }
    }

    .dashboard_panel_content {
      background-image: url("../../assets/other-img/7.png");
      display: flex;
      flex-wrap: wrap;
      min-height: 50px;
      flex-direction: row;
      justify-content: space-between;
      transition: all 1s;

      &:after {
        flex: auto;
        content: "";

      }

    }

  }
</style>
