//element.js
//获取应用实例
const chemicaltools = require('chemicaltools')
var app = getApp()
var inputValue
Page({
  data: {
    button: '查询',
    output: '请输入元素名称/符号/原子序数/IUPAC名/拼音进行查询。<br>*支持拼音模糊查询，如可输入“蛤”或“ha”查询“铪”。',
    placeholder: '元素名称/符号/原子序数/IUPAC名/拼音',
    userInfo: {}
  },
  bindKeyInput: function (e) {
    inputValue = e.detail.value
  },

  getelement: function () {
    var that = this
    if (inputValue) {
      var info = chemicaltools.searchElement(inputValue)
      if (info) {
        var output=""
        that.setData({
          elementarray:[
            { name:"元素名称",value:info.name},
            { name: "元素符号", value: info.symbol },
            { name: "IUPAC名", value: info.iupac },
            { name: "原子序数", value: info.number },
            { name: "相对原子质量", value: info.mass },
            { name: "元素名称含义", value: info.origin },
          ],
          imagesrc: info.url
        })
      } else {
        var output = "未找到元素！"
      }
    } else {
      var output = "请输入元素名称/符号/原子序数/IUPAC名/拼音！"
    }
    that.setData({ output })
  },
  onLoad: function (options) {
    inputValue = options.input
    if (inputValue != null) {
      this.getelement()
    }
  },
  onShareAppMessage: function () {
    return {
      title: '元素查询',
      path: "/pages/element/element?input=" + inputValue
    }
  }
})
