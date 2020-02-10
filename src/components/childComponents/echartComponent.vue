<template>
  <div class="componentWrapper">

    <div class="chart" ref="chart">


    </div>


  </div>

</template>

<script>
  export default {
    name: "EchartComponent",
    props: {
      option: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        chart:'',
        chartColor: "#33a0d7",
        chartBackgroundColor: '', //设置无背景色
        chartTitleColor: "white",//标题颜色
        chartLegendColor: "white"//图例字体颜色
        // title:"新闻阅读量排行",
        // subtext:"这里是描述文字",
        // type:"rank"

      }
    }
    , watch: {
      option(option) {
        this.drawChart();
      }

    }
    ,
    methods: {

      drawChart() {
        this.chart = this.$echarts.init(this.$refs.chart);
        const option = this.option;
        option.backgroundColor = this.chartBackgroundColor;
        option.textStyle = {
          color: 'white',
        };
        this.chart.setOption(option);
      }
      ,


    }
    ,
    mounted() {
      this.drawChart();

      // window.onresize = () => {
      //   console.log(111222);
      //   this.chart.resize();
      // }

      window.addEventListener("resize",()=>{
        this.chart.resize();
      })

    }
    ,
    created() {


    }
  }
</script>

<style lang="scss" scoped>

  .componentWrapper {
    height: 100%;

    .chart {
      width: 100%;
      height: 100%;

    }

  }

</style>
