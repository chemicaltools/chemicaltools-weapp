// pages/gas/gas.js
var mode = "p"
var p, V, n, T
const R = 8.314
Page({
  data: {
    button: '勾选需要计算的量，点击计算',
    p: '',
    V: '',
    n: '',
    T: ''
  },
  radioChange: function (e) {
    mode = e.detail.value
  },
  bindKeyInputp: function (e) {
    p = e.detail.value
  },
  bindKeyInputV: function (e) {
    V = e.detail.value
  },
  bindKeyInputn: function (e) {
    n = e.detail.value
  },
  bindKeyInputT: function (e) {
    T = e.detail.value
  },
  getgas: function () {
    var page = this
    if (mode == "p") {
      p = (n * R * T / V).toFixed(3)
      page.setData({ p })
    } else if (mode == "V") {
      V = (n * R * T / p).toFixed(3)
      page.setData({ V })
    } else if (mode == "n") {
      n = (p * V / R / T).toFixed(3)
      page.setData({ n })
    } else if (mode == "T") {
      T = (p * V / n / R).toFixed(3)
      page.setData({ T })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '气体计算',
      path: "/pages/gas/gas"
    }
  }
})