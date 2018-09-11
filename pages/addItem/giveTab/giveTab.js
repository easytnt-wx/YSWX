// pages/addItem/giveTab/giveTab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    schoolId : '',
    studentId: '',
    teacherId: '',
    giveList: [],
    assesses: [],
    word: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _title = options.name;
    var _schoolid = options.schoolId;
    var _teacherid = options.teacherId;
    var _studentid = options.studentId;
    var that = this;
    that.setData({
      schoolId: _schoolid,
      teacherId: _teacherid,
      studentId: _studentid
    });
    wx.setNavigationBarTitle({
      title: '点评' + _title
    });
    wx.request({
      url: 'https://www.tfkclass.com/ysyp/assess/teacher/to/student',
      data:{
        schoolId: that.data.schoolId,
        teacherPersonId : that.data.teacherId,
        studentPersonId: that.data.studentId
      },
      success:function(res){
        var giveScoreList = res.data;
        if (giveScoreList.status.success == true){
          for(var i=0;i<giveScoreList.indexes.length;i++){
            giveScoreList.indexes[i].defaultScore = 0;
          }
          that.setData({
            giveList: giveScoreList.indexes
          });
        }
      }
    })

  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //点击给分
  clickScore:function(e){
    var that = this;
    var maxscore = e.currentTarget.dataset.maxscore;
    var listIndex = e.currentTarget.dataset.index;
    var score = that.data.giveList[listIndex].defaultScore;
    if (score < maxscore){
      var _givescore = 'giveList[' + listIndex + '].defaultScore';
      that.setData({
        [_givescore]: score+1
      })
    }else{
      wx.showToast({
        title: '已经是满分了',
        icon: 'success',
        duration: 2000
      })
    }
  },
  wzdp:function(e){
    var _infp = e.detail.value;
    if(_infp != ''){
      this.setData({
        'word': _infp
      })
    }
    
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
    var that = this;
    var _existScore = [];
    for(var i=0;i<that.data.giveList.length;i++){
      if (that.data.giveList[i].defaultScore != 0 && that.data.giveList[i].plus == true){
        var _a = {
          'indexId' : that.data.giveList[i].indexId,
          'score': that.data.giveList[i].defaultScore
        };
        _existScore.push(_a);
      } else if (that.data.giveList[i].defaultScore != 0 && that.data.giveList[i].plus == false){
        var _b = {
          'indexId': that.data.giveList[i].indexId,
          'score': -(that.data.giveList[i].defaultScore)
        }
        _existScore.push(_b);
      }
    }
    if(that.data.word != ''){
      var _word = {
        'word': that.data.word
      }
      _existScore.push(_word);
    };
    console.log(_existScore);
    if (_existScore.length > 0){
      that.setData({
        assesses: _existScore
      });
      wx.request({
        url: 'https://www.tfkclass.com/ysyp/assess/teacher/to/student',
        data: {
          "schoolId": that.data.schoolId,
          "teacherPersonId": that.data.teacherId,
          "studentPersonId": that.data.studentId,
          "assesses": that.data.assesses
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data);
        }
      })
    }
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