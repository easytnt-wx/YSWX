Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  toUrl : function(e){
    wx.redirectTo({
      url: '../selectRole/selectRole',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _url = getApp().globalData.remoteSeverUrl;
    console.log(_url);
    function getJoin(openid){
      wx.request({
        url: _url + '/wechat/join/' + openid,
        success: function (res) {
          console.log(res);
        }
      })
    }
    wx.login({
      success:function(res2){
        console.log(res2.code);
        var _code = res2.code;
        
        wx.request({
          url: _url +'/wechat/oauth2?code='+_code,
          success:function(res3){
            var _data = res3.data
            if (_data.status.success && _data.accessToken.success){
              getApp().globalData.openid = _data.accessToken.openId;
              getApp().globalData.sessionKey = _data.accessToken.sessionKey;
              getJoin(getApp().globalData.openid);
            }

          }
        });

        
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