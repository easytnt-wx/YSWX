import * as echarts from '../../../ec-canvas/echarts';
const app = getApp();
var optL = [];
var optS = [];
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
      indicator: optL,
      splitNumber:3,
      axisLine:{
        show:false
      },
      splitLine:{
        show:true,
        lineStyle:{
          opacity:0
        }
      },
      splitArea:{
        show:true,
        areaStyle:{
          color: ['#e3f8ea', '#fff']
        }
      }
    },
    series: [{
      name: '总分 vs 得分',
      type: 'radar',
      data: [{
        value: optS,
        name: '得分'
      }],
      itemStyle:{
        opacity:0
      },
      lineStyle:{
        opacity:0
      },
      areaStyle:{
        color:{
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
        opacity:1
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
      axisLine:{
        show:false
      },
      axisTick:{
        show:false
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
      splitLine:{
        type:'solid'
      },
      minInterval:5
      // show: false
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [{
        gt:0,
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
      lineStyle:{
        width:3
      },
      symbol: 'circle',
      symbolSize: 10,
      markPoint:{
        data: [{
          type: 'max',
          name: '最大值',
          symbol: 'roundRect',
          symbolSize: [45, 30],
          symbolOffset: [0, -21],
          itemStyle:{
            color:'#a389d3'
          }
          }]
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    rank:'',
    promote: '',
    schoolId:'',
    personId: '',
    ec: {
      onInit: initChart,
    },
    ec2: {
      onInit: initChart2,
    },
  },

  onLoad: function (options) {
    var that = this;
    var _rank = options.rank;
    var _promote = options.promote;
    var _stdname = options.stdname;
    var _schoolId = options.schoolId;
    var _personid = options.personId;
    wx.setNavigationBarTitle({
      title: _stdname + ' - 学生报告'
    });
    that.setData({
      'rank' : _rank,
      'promote': _promote,
      'schoolId': _schoolId,
      'personId': _personid
    });

    
    var _url = getApp().globalData.remoteSeverUrl;
    wx.request({
      url: _url + '/assess/list/all/' + _schoolId + '/Student/' + _personid,
      success: function (res) {
        var _dataList = res.data;
        if (_dataList.status.success == true) {
          optL.length=0;
          optS.length=0;
          for (var i = 0; i < _dataList.assesses.length;i++){
            if (_dataList.assesses[i].score > 0){
              optL.push({
                'name': _dataList.assesses[i].indexName,
                'max': _dataList.assesses[i].indexScore
              });
              optS.push(_dataList.assesses[i].score);
            }
          }
        }
      }
    })
  },

  toUrl: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../scoreDetaill/scoreDetail?schoolId=' + that.data.schoolId + '&personId=' + that.data.personId,
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },


  onReady() {
  }
});
