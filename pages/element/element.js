//element.js
//获取应用实例
const pinyin = require('../../libs/pinyin.js')
var app = getApp()
var inputValue
var elementinfo
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
      var info = that.searchelement(inputValue)
      if (info) {
        //var output = "<b>元素名称：</b>\t" + info.name + "<br><b>元素符号：</b>\t" + info.symbol + "<br><b>IUPAC名：</b>\t" + info.iupac + "<br><b>原子序数：</b>\t" + info.number + "<br><b>相对原子质量：</b>\t" + info.mass + "<br><b>元素名称含义：</b>\t" + info.origin
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
  searchelement: function (input) {
    var i = elementinfo.length
    while (i--) {
      if (elementinfo[i].name == input || elementinfo[i].number == input || elementinfo[i].symbol.toLowerCase() == String(input).toLowerCase() || elementinfo[i].iupac.toLowerCase() == String(input).toLowerCase() || elementinfo[i].pinyin.toLowerCase() == String(input).toLowerCase() || elementinfo[i].pinyin == pinyin.convertToPinyin(String(input)).toLowerCase()) {
        return elementinfo[i]
      }
    }
  },
  onLoad: function (options) {
    inputValue = options.input
    elementinfo = app.globalData.elementinfo
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
