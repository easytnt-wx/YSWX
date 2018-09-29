// pages/teacherRegister/teacherRegister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolArray: [],
    gradesArray: [],
    classArray: [],
    schoolIndex: 0,
    gradesIndex: 0,
    classIndex: 0,
    applyingSchoolId: '',
    applyingClazzId: '',
    level: '',
    applierId: '',
    applierName: '',
    applierPhone: '',
    classStdList: [],
    personId: '',
    name : '',
    category: ''
  },
  selectSchool: function (e) {
    var that = this;
    that.setData({
      schoolIndex: e.detail.value,
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
      url: _url + '/clazz/grade/' + that.data.schoolId + '/' + that.data.level,
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
    var that = this;
    this.setData({
      'applyingClazzId': that.data.classArray[e.detail.value].clazzId
    });
  },
  selectPerson:function(e){
    var that = this;
    this.setData({
      'personId': that.data.classStdList[e.detail.value].personId,
      'name': that.data.classStdList[e.detail.value].name
    });
    console.log(this.data.personId);
    console.log(this.data.name);
  },
  formSubmit: function (e) {
    var that = this;
    var _url = getApp().globalData.remoteSeverUrl;
    var _openid = getApp().globalData.openid;
    var _studentNo = e.detail.value.studentNo;
    wx.request({
      url: _url + '/wechat/apply/follower',
      method: 'POST',
      data: {
        "code": "",           
        "wechatOpenId": _openid,
        "category": that.data.category,
        "name": that.data.applierName,
        "phone": that.data.applierPhone,
        "followers": [{
          "name": that.data.name,
          "studentNo": _studentNo,
          "schoolId": that.data.applyingSchoolId,
          "clazzId": that.data.applyingClazzId,
          "personId": that.data.personId,
          "gender": "Unkow",
          "cause": ""
        }]
      },
      success: function (res) {

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
      'applierPhone': options.applierPhone,
      'category': options.category
    })
    var _page = 1;
    var _num = 10;
    wx.request({
      url: _url + '/school/' + _page + '/' + _num,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var _data = res.data;
        if (_data.status.success == true) {
          that.setData({
            'schoolArray': _data.schools,
            'applyingSchoolId': _data.schools[0].schoolId,
            'gradesArray': _data.schools[0].grades,
            'level': _data.schools[0].grades[0].level
          });
          wx.request({
            url: _url + '/clazz/grade/' + that.data.applyingSchoolId + '/' + that.data.level,
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              var _classdata = res.data;
              if (_classdata.status.success == true) {
                that.setData({
                  'classArray': _classdata.clazzes,
                  'applyingClazzId': _classdata.clazzes[0].clazzId
                })
              };
              var applyingSchoolId = that.data.applyingSchoolId;
              var applyingClazzId = that.data.applyingClazzId;
              wx.request({
                url: _url + '/student/list/clazz/' + applyingSchoolId + '/' + applyingClazzId,
                success:function(res){
                  var _classStdList = res.data;
                  if (_classStdList.status.success){
                    that.setData({
                      'classStdList': _classStdList.students,
                      'personId': _classStdList.students[0].personId,
                      'name': _classStdList.students[0].name
                    })
                    console.log(that.data);
                  }
                }
              })
            }
          })
        }

      }
    });
    

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