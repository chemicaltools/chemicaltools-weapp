// pages/info/info.js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      getApp().globalData.user = e.detail.userInfo
    }
    wx.reLaunch({
      url: '../index/index'
    })
  }
})