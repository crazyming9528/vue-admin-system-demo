<template>
  <div class="num_item">
    <div class="name">{{text}}</div>
    <div class="value">
      <CountUp :decimals="decimals"
               :endnum="value"
               class="count_up"
               duration="1"
               prefix=""
               separator=","
               suffix=""
      ></CountUp>
    </div>
    <div class="des">单位：({{util}})</div>
  </div>
</template>

<script>
  import CountUp from "@/components/childComponents/CountUp";

  export default {
    name: "NumberItem",
    components: {CountUp},
    props: {
      text: {
        type: String,
        required: false,
        default:''
      },
      value: {
        type: null,//null 表示 任意类型
        required: false,
        default:0
      },
      decimals:{
        type: null,
        required: false,
        default:0
      },
      util:{
        type: String,
        required: false,
        default:''
      }
    },
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
  .num_item {

    /*min-width: 100px;*/
    /*min-width: 230px;*/
    padding: 15px 20px;
    transition: all 0.3s;
    cursor: pointer;

    /*&:last-child{*/
    /*  margin-right: auto;*/
    /*}*/
    &:hover{
      background-color: rgba(0, 0, 0, 0.31);
    }

    .name {
      font-size: 10px;
    }

    .des {
      font-size: 10px;
      text-align: right;
    }

    .value, .count_up {
      font-size: 35px !important;
      text-align: left;
      color: white;
      min-width: 100px;
      /*word-break: break-all;*/
    }

  }
</style>
