// pages/deviation/deviation.js
var app = getApp()
var inputValue
const chemicaltools = require("chemicaltools")
const chem = require('../../utils/chem.js')
Page({
  data: {
    button: '计算',
    output: '请输入数字，每行一个，如：<br>1.723<br>1.731<br>1.729',
    userInfo: {}
  },
  bindKeyInput: function(e) {
    inputValue = e.detail.value
  },
  getdeviation: function() {
    var page = this
    var output = page.caculateDeviation(inputValue)
    page.setData({
      output
    })
  },
  onLoad: function(options) {
    inputValue = options.input
    if (inputValue != null) {
      this.getdeviation()
    }
  },
  onShareAppMessage: function() {
    return {
      title: '偏差计算',
      path: "/pages/deviation/deviation?input=" + inputValue
    }
  },
  caculateDeviation: function(input) {
    if (!input) return "请输入数据！"
    var x = input.split(/[\r\n\\s ,;]+/)
    var numnum = Infinity,
      pointnum = Infinity
    if (x.length > 1) {
      x.forEach(function(xi) {
        var len = xi.length
        var pointlen = 0
        if (xi.substr(0, 1) == "-") len--
          if (xi.indexOf(".") >= 0) {
            len--
            var pointlen = len - xi.indexOf(".")
            if (Math.abs(parseFloat(xi)) < 1) {
              var zeronum = Math.floor(Math.log((Math.abs(parseFloat(xi)))) / Math.LN10)
              len += zeronum
            }
          }
        numnum = Math.min(numnum, len)
        pointnum = Math.min(pointnum, pointlen)
      });
      var result = chemicaltools.calculateDeviation(x.map(parseFloat))
      this.setData({
        array: [{
            name: "您输入的数据",
            value: x.join(", ")
          },
          {
            name: "平均数",
            value: result.average.toFixed(pointnum)
          },
          {
            name: "平均偏差",
            value: result.average_deviation.toFixed(pointnum)
          },
          {
            name: "相对平均偏差",
            value: chem.sciconut(result.relative_average_deviation * 1000, numnum - 1) + "‰"
          },
          {
            name: "标准偏差",
            value: chem.sciconut(result.standard_deviation, numnum - 1)
          },
          {
            name: "相对标准偏差",
            value: chem.sciconut(result.relative_standard_deviation * 1000, numnum - 1) + "‰"
          },
        ],
      })
      return ""
    } else {
      return "请输入多个数据。"
    }
  },
})