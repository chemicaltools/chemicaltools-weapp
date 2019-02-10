// pages/gas/gas.js
var mode = "p"
var value = {
  p: '',
  V: '',
  n: '',
  T: ''
}
const chemicaltools = require("chemicaltools")
Page({
  data: {
    button: '勾选需要计算的量，点击计算',
    ...value
  },
  radioChange: function(e) {
    mode = e.detail.value
  },
  bindKeyInput: function(e) {
    value[e.target.dataset.mode] = e.detail.value
  },
  getgas: function() {
    value[mode] = null
    var n = ["p", "V", "n", "T"]
    var result = chemicaltools.calculateGas(...n.map(function(x) {
      return value[x]
    }))
    this.setData(result)
  },
  onShareAppMessage: function() {
    return {
      title: '气体计算',
      path: "/pages/gas/gas"
    }
  }
})