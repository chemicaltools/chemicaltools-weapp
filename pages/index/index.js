//index.js
//获取应用实例
var app = getApp()
const AV = require("../../libs/av-weapp-min.js");
Page({
  data: {
    defaultSize: 'default',
    element: '元素查询',
    mass: '质量计算',
    deviation: '偏差计算',
    gas: '气体计算',
    acid: '酸碱计算',
    exam: '元素记忆',
    userInfo: {}
  },
  onLoad: function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              const user = AV.User.current();
              user.set(res.userInfo).save().then(user => {
                app.globalData.user = user.toJSON();
                that.setData({
                  userInfo: app.globalData.user,
                  hasUserInfo: true
                })
              }).catch(console.error);
              wx.switchTab({
                url: '../index/index'
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '../info/info'
          })
        }
      }
    })
  },
  open: function(e) {
    wx.navigateTo({
      url: e.target.dataset.page
    })
  },
  onShareAppMessage: function() {
    return {
      title: '化学e+',
      path: "/pages/index/index"
    }
  },
  lab: function() {
    wx.navigateToMiniProgram({
      appId: 'wx49c5c6b9f350fd06',
      success(res) {

      }
    })
  }
})