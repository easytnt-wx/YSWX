import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
function initChart2(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#fff",
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      shape: 'circle',
      indicator: [{
        name: '维度1',
        max: 500
      },
      {
        name: '维度2',
        max: 500
      },
      {
        name: '维度3',
        max: 500
      },
      {
        name: '维度4',
        max: 500
      },
      {
        name: '维度5',
        max: 500
      },
      {
        name: '维度6',
        max: 500
      }
      ],
      splitNumber: 3,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      splitArea: {
        show: true,
        areaStyle:{
          color: ['#e3f8ea','#fff']
        }
      }
    },
    series: [{
      name: '预算 vs 开销',
      type: 'radar',
      data: [{
        value: [400, 300, 500, 300, 409, 400],
        name: '预算'
      }],
      itemStyle: {
        opacity: 0
      },
      lineStyle: {
        opacity: 0
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#1dc5e9' // 0% 处的颜色
          }, {
            offset: 1, color: '#1de9b6' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        opacity: 1
      }
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周', '月', '季度', '年'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        type: 'solid'
      },
      minInterval: 5
      // show: false
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [{
        gt: 0,
        lte: 1,
        color: '#f44236'
      }, {
        gt: 1,
        lte: 2,
        color: '#f4c22b'
      }, {
        gt: 2,
        lte: 3,
        color: '#a389d3'
      }]
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: false,
      data: [3, 12, 9, 17],
      lineStyle: {
        width: 3
      },
      symbol: 'circle',
      symbolSize: 10,
      markPoint: {
        data: [{
          type: 'max',
          name: '最大值',
          symbol: 'roundRect',
          symbolSize: [45, 30],
          symbolOffset: [0, -21],
          itemStyle: {
            color: '#a389d3'
          }
        }]
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onLoad: function (options) {

  },


  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart,
    },
    ec2: {
      onInit: initChart2,
    },
  },

  onReady() {
  }
});
