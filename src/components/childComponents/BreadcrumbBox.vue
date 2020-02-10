<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :key="index" :to="item.path" v-for="(item,index) of this.breadList">{{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>


  export default {
    name: "BreadcrumbBox",
    components: {},
    props: {},
    data() {
      return {}
    },
    computed: {
      breadList:function(){
        // console.log(this.$store.getters.getBreadList,111)
        return this.$store.getters.getBreadList;
      },
    },
    methods: {},
    created() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      matched = [{path: '/', meta: {title: 'Home'}}].concat(matched)
      console.log(matched);
      this.breadcrumb = matched;
      // console.log(this.$router)
    },
    mounted() {
    },
  }
</script>

<style lang='scss' scoped>
  .wrapper {

  }
</style>
