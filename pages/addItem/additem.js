// pages/addItem/additem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolId: 'SCH1936574f611f495d911f0cea3cb3c471',
    clazzId: 'CLA4965b0fc508e49449734c95f7a079d14',
    teacherId: 'PER7d71bebc033541dcadef9c7e6716f832',
    studentsList: []
  },
  toUrl: function(e){
    var stuName = e.currentTarget.dataset.name;
    var studentId = e.currentTarget.dataset.studentid;
    var that = this;
    wx.navigateTo({
      url: 'giveTab/giveTab?name=' + stuName + '&schoolId=' + that.data.schoolId + '&teacherId=' + that.data.teacherId + '&studentId=' + studentId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.tfkclass.com/ysyp/student/list/clazz/nameSorted/' + that.data.schoolId + '/' + that.data.clazzId,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var stuList = res.data;
        if(stuList.status.success == true){
          that.setData({
            studentsList: stuList.students
          })
        };
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