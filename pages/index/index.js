//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    defaultSize: 'default',
    //motto: 'Hello World',
    element: '元素查询',
    mass: '质量计算',
    deviation: '偏差计算',
    gas: '气体计算',
    acid: '酸碱计算',
    exam: '元素记忆',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    //wx.navigateTo({
    //  url: '../logs/logs'
    //})
  },
  onLoad: function () {
    console.log('onLoad')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  open: function ({ target: {
    dataset: {
      page
    }
  }
  }) {
    wx.navigateTo({
      url: page
    })
  },
  onShareAppMessage: function () {
    return {
      title: '化学e+',
      path: "/pages/index/index"
    }
  },
  lab: function () {
    wx.navigateToMiniProgram({
      appId: 'wx49c5c6b9f350fd06',
      success(res) {
        // 打开成功
      }
    })
  }

})
