<template>
  <div class="user">
    <transition enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "User",
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
  .user {
  }
</style>
