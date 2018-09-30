App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    var _url = that.globalData.remoteSeverUrl;
    function getJoin(openid) {
      wx.request({
        url: _url + '/wechat/join/' + openid,
        success: function (res) {
          var _regData = res.data;
          if(_regData.status.success){
            for(var i=0;i<_regData.weChats.length;i++){
              if (_regData.weChats[i].role == "Teacher" ){
                getAudited(_regData.weChats[i])
                
                that.globalData.personId = _regData.weChats[i].personId;
                that.globalData.name = _regData.weChats[i].name;
                that.globalData.role = 'Teacher';

                break;
              }
            }
          }
        }
      })
    }
    function getAuditing(weChat) {
      wx.request({
        url: _url + '/apply/auditing/' + weChat.personId + '?openId=' + weChat.openId,
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          var _data2 = res.data;
          if (_data2.clazzs.length != 0) {
            wx.redirectTo({
              url: '../check/check',
            })
          } else {
            wx.redirectTo({
              url: '../teacherRegister/teacherRegister?applierId='+weChat.personId+'&applierName='+weChat.name +'&applierPhone='+weChat.phone,
            })
          }

        }
      })

    };
    function getAudited(weChat){
      wx.request({
        url: _url + '/apply/audited/' + weChat.personId + '?openId=' + weChat.openId,
        success: function (res) {
          var _data = res.data;
          if (_data.status.success) {
            console.log(_data.clazzs.length);
            if (_data.clazzs.length > 0) {
              getApp().globalData.schoolId = _data.clazzs[0].schoolId;
              getApp().globalData.clazzId = _data.clazzs[0].clazzId;
              getApp().globalData.schoolName = _data.clazzs[0].schoolName;
              getApp().globalData.gradeName = _data.clazzs[0].gradeName;
              getApp().globalData.clazzName = _data.clazzs[0].clazzName;
              wx.switchTab({
                url: '/pages/addItem/additem',
              });
            } else {
              // that.setData({
              //   'applierId': weChat.personId,
              //   'applierName': weChat.name,
              //   'applierPhone': weChat.phone
              // });
              getAuditing(weChat);
            }
          }
        }
      })
    }

    wx.login({
      success: function (res2) {
        var _code = res2.code;
        wx.request({
          url: _url + '/wechat/oauth2?code=' + _code,
          success: function (res3) {
            var _data = res3.data
            if (_data.status.success && _data.accessToken.success) {
              that.globalData.openid = _data.accessToken.openId;
              that.globalData.sessionKey = _data.accessToken.sessionKey;
              getJoin(that.globalData.openid);
            }

          }
        });


      }
    });
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData:{
    remoteSeverUrl : 'https://www.tfkclass.com/ysyp',
    openid: '',
    name: '',
    sessionKey: '',
    personId: '',
    clazzId: '',
    schoolId: '',
    schoolName:'',
    gradeName:'',
    clazzName: '',
    role : ''
  }
})
