<template>
  <div class="menu-item-wrapper">

    <template v-for="(item,index) in routes ">

      <el-submenu :index="index.toString()" v-if="hasChildren(item)">
        <template slot="title">
          <i class="fa fa-cog"></i>
          <span v-if="item.meta">{{item.meta.title}}</span>
          <span></span>
        </template>
        <MenuListItem :routes="item.children"></MenuListItem>
      </el-submenu>

      <el-menu-item :index="item.path" v-else v-show="!item.hidden">
        <span v-if="item.meta"> {{item.meta.title}}</span>
      </el-menu-item>
    </template>

  </div>
</template>

<script>
    export default {
        name: "MenuListItem",
        components: {},
        props: {
            routes: {
                type: Array,
            }
        },
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
            hasChildren(item) {
                return !!(item.children && item.children.length > 0);
            },

            // findAncestors(source, title, obj) {
            //     obj = obj ? obj : {};
            //     source.forEach((item, index) => {
            //         if (item.meta.title === title) {
            //             item.path += item.meta.title;
            //             if (obj.meta.title) {
            //                 this.findAncestors(data, obj.meta.title);
            //             }
            //         } else {
            //             if (item.children.length > 0) {
            //                 this.findAncestors(item.children, title, item)
            //             }
            //         }
            //     })
            // },
        },
        created() {
            // console.log(this.routes, 5555555);
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>
  .wrapper {
  }
</style>
