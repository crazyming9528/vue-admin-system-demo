export default {
  backgroundColor: '#2c343c',

  title:
    {
      text: '用户版本(测试数据)',
      left:
        'center',
      top:
        20,
      textStyle:
        {
          color: '#ccc'
        }
    }
  ,

  tooltip: {
    trigger: 'item',
    formatter:
      "{a} <br/>{b} : {c} ({d}%)"
  }
  ,

  visualMap: {
    show: false,
    min:
      80,
    max:
      600,
    inRange:
      {
        colorLightness: [0, 1]
      }
  }
  ,
  series: [
    {
      name: '用户数量',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        {value: 335, name: '1.0版本'},
        {value: 310, name: '2.0版本'},
        {value: 274, name: '3.0版本'},
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
}
;
