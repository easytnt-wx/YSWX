// pages/addItem/additem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolId: 'SCH691b72f2f8c04d23a3389eb972dc9613',
    clazzId: 'CLAdb685a744d61409797b39895d871e3b3',
    teacherId: 'PER12343a05bc444a75ae07ad4a5606ce83',
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