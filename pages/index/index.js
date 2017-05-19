//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    defaultSize: 'default',
    //motto: 'Hello World',
    element: '元素查询',
    mass:'质量计算',
    deviation:'偏差计算',
    gas:'气体计算',
    acid:'酸碱计算',
    exam:'元素记忆',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    //wx.navigateTo({
    //  url: '../logs/logs'
    //})
  },
  openelement:function(){
    wx.navigateTo({
      url: '../element/element'
    })
  },
  openmass:function(){
    wx.navigateTo({
      url: '../mass/mass'
    })
  },
  opendeviation:function(){
    wx.navigateTo({
      url: '../deviation/deviation'
    })
  },
  opengas:function(){
    wx.navigateTo({
      url: '../gas/gas'
    })
  },
  openacid:function(){
    wx.navigateTo({
      url: '../acid/acid'
    })
  },
  openexam:function(){
    wx.navigateTo({
      url: '../exam/exam'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
    onShareAppMessage: function() {
        return {
            title: '化学e+',
            path: "/pages/index/index"
        }
    }
})
