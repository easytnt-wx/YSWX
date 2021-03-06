// pages/teacherRegister/teacherRegister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolArray: [],
    gradesArray: [],
    classArray: [],
    schoolIndex:0,
    gradesIndex:0,
    classIndex:0,
    applyingSchoolId: '',
    applyingClazzId: '',
    level: '',
    applierId: '',
    applierName: '',
    applierPhone: ''
  },
  selectSchool:function(e){
    var that = this;
    that.setData({
      schoolIndex : e.detail.value,
      applyingSchoolId: that.data.schoolArray[e.detail.value].schoolId,
      gradesArray: that.data.schoolArray[e.detail.value].grades
    });
  },
  selectGrades: function (e) {
    var that = this;
    var _url = getApp().globalData.remoteSeverUrl;
    this.setData({
      gradesIndex: e.detail.value,
      level: that.data.gradesArray[e.detail.value].level
    });
    console.log(that.data.level);
    wx.request({
      url: _url +'/clazz/grade/' + that.data.schoolId + '/' + that.data.level,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var _classdata = res.data;
        if (_classdata.status.success == true) {
          console.log(_classdata.clazzes[0].clazzId);
          that.setData({
            'classArray': _classdata.clazzes,
            'applyingClazzId': _classdata.clazzes[0].clazzId
          })
        }
      }
    })
  },
  selectClass: function (e) {
    this.setData({
      'applyingClazzId': that.data.classArray[e.detail.value].clazzId
    })
  },
  formSubmit : function(e){
    var that = this;
    var _url = getApp().globalData.remoteSeverUrl;
    wx.request({
      url: _url + '/apply/school',
      method: 'POST',
      data: {
        "applyingSchoolId": that.data.applyingSchoolId,
        "applyingClazzId": that.data.applyingClazzId,
        "applierId": that.data.applierId,
        "applierName": that.data.applierName,
        "applierPhone": that.data.applierPhone
      },
      success: function (res) {
        wx.redirectTo({
          url: '../check/check',
        })
      }

    })
    // wx.switchTab({
    //   url: '../addItem/additem',
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var _url = getApp().globalData.remoteSeverUrl;
    that.setData({
      'applierId': options.applierId,
      'applierName': options.applierName,
      'applierPhone': options.applierPhone
    })
    var _page = 1;
    var _num = 10;
    wx.request({
      url: _url + '/school/'+ _page + '/' + _num,
      dataType:'json',
      responseType:'text',
      success:function(res){
        var _data = res.data;
        if(_data.status.success == true){
          that.setData({
            'schoolArray' :_data.schools,
            'applyingSchoolId': _data.schools[0].schoolId,
            'gradesArray': _data.schools[0].grades,
            'level': _data.schools[0].grades[0].level
          });
          wx.request({
            url: _url + '/clazz/grade/' + that.data.applyingSchoolId + '/' + that.data.level,
            dataType:'json',
            responseType: 'text',
            success:function(res){
              var _classdata = res.data;
              if(_classdata.status.success == true){
                that.setData({
                  'classArray': _classdata.clazzes,
                  'applyingClazzId': _classdata.clazzes[0].clazzId
                })
              }
            }
          })
        }

      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})