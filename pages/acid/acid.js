// pages/acid/acid.js
var pKa, c
var mode = "acid"
const chem = require('../../utils/chem.js')
const chemicaltools = require('chemicaltools')

Page({
  data: {
    items: [
      { name: 'acid', value: '酸', checked: 'true' },
      { name: 'base', value: '碱' },
    ],
    pKaorpKb: "pKa",
    c: '分析浓度c',
    button: '计算',
    output: '请输入酸和碱的pKa和分析浓度进行计算！',
    isIpx: getApp().globalData.isIpx
  },
  radioChange: function (e) {
    mode = e.detail.value
    if (mode == "acid") {
      this.setData({
        pKaorpKb: "pKa",
      })
    } else {
      this.setData({
        pKaorpKb: "pKb",
      })
    }
  },
  getacid: function () {
    var AorB = (mode == "acid")
    var pKw = parseFloat(wx.getStorageSync('pKw'))
    if(!pKw) pKw=14
    this.setData({pKw})
    var output = this.calacid(parseFloat(c), pKa, AorB,pKw)
    this.setData({ output })
  },
  bindKeyInputc: function (e) {
    c = e.detail.value
  },
  bindKeyInputpKa: function (e) {
    pKa = e.detail.value
  },
  onShareAppMessage: function () {
    return {
      title: '酸碱计算',
      path: "/pages/acid/acid"
    }
  },
  onLoad: function (options) {
    var pKw = parseFloat(wx.getStorageSync('pKw'))
    if (!pKw) pKw = 14
    this.setData({ pKw })
  },
  calacid: function (c, strpKa, AorB, pKw = 14) {
    if (!strpKa || !c) return "请输入数据！"
    var strpKaArray = strpKa.split(/[\r\n\\s ,;]+/)
    var result = chemicaltools.calculateAcid(c, strpKaArray.map(parseFloat), AorB, pKw)
    var output = "<b>{0}</b>, c={1}mol/L, ".format((AorB ? "HA" : "BOH"), c)
    var i = 1;
    strpKaArray.forEach(function (pKa) {
      output += "pK<sub>{0}</sub>{1}={2}, ".format((AorB ? "a" : "b"), (strpKaArray.length > 1 ? "<sub>{0}</sub>".format(i++) : ''), pKa)
    });
    output += "<br>溶液的pH为{0}.".format(result.pH.toFixed(2))
    result.ion.forEach(function (ion) {
      output += "<br>c({0})={1}mol/L,".format(chem.chemicalname(ion.name), chem.sciconut(ion.c, 2))
    })
    output = output.substring(0, output.length - 1) + "."
    return output
  },
})