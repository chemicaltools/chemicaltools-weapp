// pages/setting/setting.js
Page({
  data: {
    exammode: ["根据元素名称回答元素符号", " 根据元素名称回答原子序数", "根据元素名称回答IUPAC名", "根据元素符号回答元素名称", "根据元素符号回答原子序数", "根据元素符号回答IUPAC名", "根据原子序数回答元素名称", "根据原子序数回答元素符号", "根据原子序数回答IUPAC名", "根据IUPAC名回答元素名称", "根据IUPAC名回答元素符号","根据IUPAC名回答原子序数"]
  },
  onLoad: function (options) {
    var page=this
    wx.getStorage({
      key: 'exammode',
      success: function (res) {
        page.setData({ index: res.data })
      },
      fail: function () {
        page.setData({ index: 2 })
      }
    })
    wx.getStorage({
      key: 'pKw',
      success: function (res) {
        page.setData({ pKw: res.data })
      },
      fail: function () {
        page.setData({ pKw: 14 })
      }
    })
    wx.getStorage({
      key: 'exammax',
      success: function (res) {
        page.setData({ exammax: res.data })
      },
      fail: function () {
        page.setData({ exammax: 86 })
      }
    })
  },
  exammodeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    wx.setStorage({
      key: "exammode",
      data: e.detail.value
    })
  },
  pKwchange:function(e) {
    wx.setStorage({
      key: "pKw",
      data: e.detail.value
    })
  },
  exammaxchange:function(e){
    wx.setStorage({
      key: "exammax",
      data: e.detail.value
    })
  }
})