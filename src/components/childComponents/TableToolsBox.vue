<template>
  <div class="component_wrapper">
    <div class="search_wrapper" ref="search_wrapper">
      <slot name="search">
      </slot>
    </div>
    <div class="tools">
      <!--      <button @click="switchSearch($event)" class="btn" ref="search_btn" v-if="showSearch"><span-->
      <!--        class="fa fa-search"></span></button>-->
      <button @click="search" class="btn" ref="search_btn" v-if="showSearch"><span
        class="fa fa-search"></span></button>
      <button @click="refresh()" class="btn" v-if="showRefresh"><span class="fa fa-refresh"></span></button>
      <button @click="addFn()" class="btn" v-if="showAdd"><span class="fa fa-plus"></span></button>
      <button @click="downloadFn()" class="btn" v-if="showDownLoad"><span class="fa fa-download"></span></button>
      <button @click="toggle()" class="btn1" v-if="showChart"><span class=" fa fa-bar-chart"></span></button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TableToolsBox",
    components: {},
    props: {
      searchInfo: {
        type: Array,
        required: false,
      },
      showSearch: {
        type: Boolean,
        default: true,
        required: false,
      },
      showAdd: {
        type: Boolean,
        default: true,
        required: false,
      },
      showRefresh: {
        type: Boolean,
        default: true,
        required: false,
      },
      showDownLoad: {
        type: Boolean,
        default: true,
        required: false,
      },
      showChart: {
        type: Boolean,
        default: true,
        required: false,
      }
    },
    data() {
      return {
        display: {
          searchBox: false,
        }
      }
    },
    watch: {},
    computed: {},
    methods: {
      switchSearch(e) {
        this.display.searchBox = !this.display.searchBox;//切换 是否 显示搜索弹框
        console.log(this.display.searchBox);
        if (this.display.searchBox) {
          let dom = this.$refs.search_wrapper;
          dom.style.top = e.clientY - 50 + "px";
          dom.style.left = e.clientX - 420 + "px";
        }
      },
      search() {

        this.$emit("search");
        // this.switchSearch();
      },
      refresh() {
        this.$emit("refresh");
      },
      addFn() {
        this.$emit("add");
      },
      downloadFn(){
        this.$emit('download')
      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/base";

  .component_wrapper {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;

    .search_wrapper {
      display: block;
      color: rgba(0, 0, 0, .3);
      font-size: 14px;
      text-align: right;
      flex: 1;
      .search_param{
        margin-bottom: 5px;
      }

    }


    .tools {
      /*background-color: #003f6b;*/
      height: 40px;
      color: white;
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;

      .btn {
        width: 50px;
        /*background-color: #7bbdbc;*/
        background-color: $baseColor3;
        color: white;
        border: 1px solid transparent;
        border-radius: 1px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .3);
        margin: 0 5px;
        transition: all 0.3s;

        &:hover {
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, .3);
        }

        &:active {
          background-color: darken($baseColor3, 10);
          box-shadow: 0 3px 8px 0 rgba(0, 0, 0, .3);
          transform: translateY(2px);
        }
      }

      .btn1 {

        width: 50px;
        /*background-color: #7bbdbc;*/
        background-color: #67C23A;
        color: white;
        border: 1px solid transparent;
        border-radius: 1px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .3);
        margin: 0 5px;
        transition: all 0.3s;

        &:hover {

          box-shadow: 0 0 8px 0 rgba(0, 0, 0, .3);
        }

        &:active {
          background-color: darken(#67C23A, 10);
          box-shadow: 0 3px 8px 0 rgba(0, 0, 0, .3);
          transform: translateY(2px);
        }
      }
    }

  }
</style>
