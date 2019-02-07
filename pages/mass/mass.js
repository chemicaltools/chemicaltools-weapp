// pages/mass/mass.js
var app = getApp()
var inputValue
const chemicaltools = require("chemicaltools")
const format = require('string-format')
const chem = require('../../utils/chem.js')
format.extend(String.prototype, {})
Page({
  data: {
    button: '计算',
    output: '请输入化学式，如(CH<sub>3</sub>)<sub>2</sub>CHMgBr',
    placeholder: '分子式',
    userInfo: {}
  },
  bindKeyInput: function(e) {
    inputValue = e.detail.value
  },
  getmass: function() {
    var output = this.calculateMass(inputValue)
    this.setData({
      output
    })
  },
  onLoad: function(options) {
    inputValue = options.input
    if (inputValue != null) {
      this.getmass()
    }
  },
  onShareAppMessage: function() {
    return {
      title: '质量查询',
      path: "/pages/mass/mass?input=" + inputValue
    }
  },

  calculateMass: function(x) {
    var result = chemicaltools.calculateMass(x)
    if (result) {
      var output = "<b>{0}</b><br><b>相对分子质量</b>={1}".format(chem.chemicalname(result.name), result.mass.toFixed(2))
      for (var i = 0; i < result.peratom.length; i++) {
        output += "<br><b>{0}</b>（符号：{1}），{2}个原子，原子量为{3}，质量分数为{4}%；".format(result.peratom[i].name, result.peratom[i].symbol, result.peratom[i].atomnumber, parseFloat(result.peratom[i].mass).toFixed(2), result.peratom[i].massper.toFixed(2))
      }
      return output.substring(0, output.length - 1) + "。"
    } else {
      return "输入出错！"
    }
  },
})