// pages/deviation/deviation.js
var app = getApp()
var inputValue
Page({
  data: {
    button: '计算',
    output: '请输入数字，每行一个，如：<br>1.723<br>1.731<br>1.729',
    userInfo: {}
  },
  bindKeyInput: function (e) {
    inputValue = e.detail.value
  },
  getdeviation: function () {
    var page = this
    var output = page.caculateDeviation(inputValue)
    page.setData({ output })
  },
  onLoad: function (options) {
    inputValue = options.input
    if (inputValue != null) {
      this.getdeviation()
    }
  },
  onShareAppMessage: function () {
    return {
      title: '偏差计算',
      path: "/pages/deviation/deviation?input=" + inputValue
    }
  },
  caculateDeviation: function (input) {
    var that=this
    if (x = "") return "请输入数据！"
    var x = input.split("\n")
    var t = x.length
    if (t == 1) {
      x = input.split(" ")
      t = x.count
    }
    var sum = 0
    if (t > 1) {
      for (var i = 0; i < t; i++) {
        x[i] = x[i].replace(/\s+/g, "")
        sum = sum + parseFloat(x[i])
        var len = x[i].length
        if (x[i].substr(0, 1) == "-") len = len - 1
        if (x[i].indexOf(".")) {
          len = len - 1
          var pointlen = len - x[i].indexOf(".");
          if (Math.abs(parseFloat(x[i])) < 1) {
            var zeronum = Math.floor(Math.log((Math.abs(parseFloat(x[i])))) / Math.LN10)
            len = len + zeronum
          }
        } else {
          var pointlen = 0
        }
        if (i > 0) {
          if (len < numnum) numnum = len
          if (pointlen < pointnum) pointnum = pointlen
        } else {
          var numnum = len
          var pointnum = pointlen
        }
      }
      var average = sum / t;
      var abssum = 0
      var squrasum = 0
      for (i = 0; i < t; i++) {
        var xabs = Math.abs(parseFloat(x[i]) - average)
        var xsqure = Math.pow(parseFloat(x[i]) - average, 2)
        var abssum = abssum + xabs
        var squresum = squrasum + xsqure
      }
      var deviation = abssum / t
      var deviation_relatibe = deviation / average * 1000
      var s = Math.sqrt(squresum / (t - 1))
      var s_relatibe = s / deviation * 1000
      that.setData({
        array: [
          { name: "您输入的数据", value: x.join("，") },
          { name: "平均数", value: average.toFixed(pointnum) },
          { name: "平均偏差", value: deviation.toFixed(pointnum) },
          { name: "相对平均偏差", value: this.sciconut(deviation_relatibe, numnum - 1) },
          { name: "标准偏差", value: this.sciconut(s, numnum - 1) },
          { name: "相对标准偏差", value: this.sciconut(s_relatibe, numnum - 1) + "‰" },
        ],
      })
      return  "" 
    } else {
      return "请输入多个数据。"
    }
  },
  sciconut: function (value, num) {
    var p = Math.floor(Math.log(value) / Math.LN10)
    var n = value * Math.pow(10, -p)
    if (n == 0) {
      return n.toFixed(num)
    } else {
      return n.toFixed(num) + "×10<sup>" + p + "</sup>"
    }
  }
})
