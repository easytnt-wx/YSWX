// pages/addItem/giveTab/giveTab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    clazzid: 'CLA4965b0fc508e49449734c95f7a079d14',
    scoreList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.tfkclass.com/ysyp/assess/rank/clazz/day/' + that.data.clazzid,
      success:function(res){
        var _dataList = res.data;
        if(_dataList.status.success == true){
          that.setData({
            'scoreList': _dataList.ranks
          });
          console.log(that.data.scoreList);
        }
      }
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
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
  toUrl: function(e){
    var rank = e.currentTarget.dataset.rank;
    var promote = e.currentTarget.dataset.promote;
    var schoolId = e.currentTarget.dataset.schoolid;
    var personId = e.currentTarget.dataset.personid;
    var stdname = e.currentTarget.dataset.stdname;
    wx.navigateTo({
      url: '../reportDetail/reportDetail?rank=' + rank + '&promote=' + promote + '&schoolId=' + schoolId + '&personId=' + personId + '&stdname=' + stdname,
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