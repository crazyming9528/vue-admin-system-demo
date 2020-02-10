<template>
  <div class="Layout">
    <transition enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "Layout",
        components: {},
        props: {},
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {},
        created() {
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>
  .Layout {
  }
</style>
