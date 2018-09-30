// pages/registerMoble/registerMoble.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applierId: '',
    applierName:'',
    applierPhone:''
  },
  formSubmit : function(e){
    var _url = getApp().globalData.remoteSeverUrl;
    var _openid = getApp().globalData.openid;
    var _name = e.detail.value.name;
    var _phone = e.detail.value.phone;
    if(_name.length == 0){
      wx.showToast({
        title: '请输入姓名',
        icon: 'error',
        duration: 2000
      });
      return;
    };
    if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(_phone))) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'error',
        duration: 2000
      });
      return;
    };
    var that = this;
    wx.request({
      url: _url + '/wechat/bind',
      method: 'POST',
      data: {
        "wechatOpenId": _openid,
        "category": "Teacher",
        "name": _name,
        "phone": _phone
      },
      success:function(res){
        var _weChats = res.data.weChats;
        for(var i=0;i<_weChats.length;i++){
          var weChat = _weChats[i];
          if (weChat.role == 'Teacher'){
            
            wx.navigateTo({
              url: '../teacherRegister/teacherRegister?applierId=' + weChat.personId + '&applierName=' + weChat.name + '&applierPhone='+ weChat.phone,
            });
          }
        }
      }

    })
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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