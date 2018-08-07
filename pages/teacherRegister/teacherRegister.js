// pages/teacherRegister/teacherRegister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolArray :["深圳市第一高级中学","深圳市红岭中学","深圳市光明中学","深圳大学第一附属中学"],
    classArray: ["六年级1班","六年级2班","六年级3班","六年级4班","六年级5班","六年级6班"],
    schoolIndex:0,
    classIndex:0
  },
  selectSchool:function(e){
    this.setData({
      schoolIndex : e.detail.value
    })
  },
  selectClass: function (e) {
    this.setData({
      classIndex: e.detail.value
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