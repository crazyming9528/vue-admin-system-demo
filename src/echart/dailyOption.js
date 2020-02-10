
export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  // toolbox: {
  //   feature: {
  //     dataView: {show: true, readOnly: false},
  //     magicType: {show: true, type: ['line', 'bar']},
  //     restore: {show: true},
  //     saveAsImage: {show: true}
  //   }
  // },
  legend: {
    data:['新增用户','登录用户','充值金额'],
    textStyle: {
      color: 'white'

    },
  },
  xAxis: [
    {
      type: 'category',
      data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '人数',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} 人'
      }
    },
    {
      type: 'value',
      name: '金额',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value} 元'
      }
    }
  ],
  series: [
    {
      name:'新增用户',
      type:'bar',
      data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name:'登录用户',
      type:'bar',
      data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name:'充值金额',
      type:'line',
      yAxisIndex: 1,
      data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};
