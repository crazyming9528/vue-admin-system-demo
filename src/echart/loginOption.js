import lineAnimationDiff from "echarts/src/chart/line/lineAnimationDiff";

export default {

  title: {
    text: '',
    textStyle: {
      color: 'white'

    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100,
    },
    {
      type: 'slider',                         //slider表示有滑动块的，inside表示内置的
      // fillerColor:"rgba(167,183,204,0.4)",  //选中范围的填充颜色。
      // borderColor:"#ddd",                     //边框颜色。
      filterMode: 'filter',                   //'filter'：当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据
      start: 0,
      end: 100,
    }],
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontSize: 18
    }
  },
  legend: {
    textStyle: {
      color: 'white'

    },
    data: [],
    // data: data.series.map(item => {
    //   return item.name;
    // })
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // data: data.xAxis,
    data: [],
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data:[],
      type:"line",
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c}人'
        }
      },
      itemStyle: {
        normal: {
          color: 'orange',
          lineStyle: {
            color: 'orange',
          }
        }
      }
    },
    {
      data:[],
      type:"line",
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c}人'
        }
      },
      itemStyle: {
        normal: {
          color: '#33CCFF',
          lineStyle: {
            color: '#33CCFF'
          }
        }
      }
    }

  ]

}
