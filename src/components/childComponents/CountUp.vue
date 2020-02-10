<template>
  <span></span>
</template>

<script>
import CountUp from 'countup';

  export default {
    name: "CountUp",
    components: {},
    data() {
      return {
        instance: null

      }
    },
    props: {
      start: {
        type: Boolean,
        default: true
      },
      startnum: {
        default: 0
      },
      endnum: {

        required: true
      },
      decimals: {
        default: 0
      },
      duration: {
        default: 2
      },
      useEasing: {
        type: Boolean,
        default: false
      },
      separator: {
        type: String,
        default: ''
      },
      prefix: {
        type: String,
        default: ''
      },
      suffix: {
        type: String,
        default: ''
      },
      callback: {
        type: Function
      }
    },
    watch: {
      start(val) {
        val && this.instance.start(() => {
          this.callback && this.callback(this.instance);
        });
      },
      endnum(value) {
        this.instance && this.instance.update && this.instance.update(value);
      }
    },
    computed: {},
    methods: {
      init() {
        if (!this.instance) {
          const options = {
            decimal: '.',
            useEasing: this.useEasing,
            separator: this.separator,
            prefix: this.prefix,
            suffix: this.suffix
          };
          this.instance = new CountUp(this.$el, this.startnum, this.endnum, this.decimals, this.duration, options);
          this.start && this.instance.start(() => {
            this.callback && this.callback(this.instance);
          });
        }
      },
    },
    created() {
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.instance = null;
    }
  }
</script>

<style lang='scss' scoped>
  .wrapper {
  }
</style>
