// pages/acid/acid.js
var pKa, c
var mode = "acid"
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
    var page = this
    mode = e.detail.value
    if (mode == "acid") {
      page.setData({
        pKaorpKb: "pKa",
      })
    } else {
      page.setData({
        pKaorpKb: "pKb",
      })
    }
  },
  getacid: function () {
    var page = this
    if (mode == "acid") {
      var AorB = true
    } else {
      var AorB = false
    }
    var pKw = parseFloat(wx.getStorageSync('pKw'))
    if(!pKw) pKw=14
    page.setData({pKw})
    var output = page.calacid(parseFloat(c), pKa, AorB,pKw)
    page.setData({ output })
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
  calpH: function (pKa, c, pKw) {
    var Ka1 = Math.pow(10, -pKa[0])
    var Kw = Math.pow(10, -pKw)
    var cH = (Math.sqrt(Ka1 * Ka1 + 4 * Ka1 * c + Kw) - Ka1) * 0.5
    if (cH > 0) return -Math.log(cH) / Math.LN10
    else return 1024
  },
  calpHtoc: function (pKa, c, pH) {
    var D = 0
    var E = 1
    var G = new Array()
    var Ka = new Array()
    var pHtoc = new Array()
    var H = Math.pow(10, -pH)
    var F = Math.pow(H, pKa.length + 1)
    for (var i = 0; i < pKa.length; i++) {
      Ka[i] = Math.pow(10, -pKa[i])
    }
    for (var i = 0; i < pKa.length + 1; i++) {
      G[i] = F * E
      D = D + G[i]
      F = F / H
      E = E * Ka[i]
    }
    for (var i = 0; i < pKa.length + 1; i++) {
      pHtoc[i] = c * G[i] / D
    }
    return pHtoc
  },
  calacid: function (c, strpKa, AorB, pKw = 14, acidName = "HA") {
    const liquidpKa = -1.74
    if (!strpKa||!c) return "请输入数据！"
    if (AorB) {
      var ABname = "A"
      var ABnameall = "HA"
    } else {
      var ABname = "B"
      var ABnameall = "BOH"
    }
    var strpKaArray = strpKa.split(" ")
    var valpKa = new Array()
    for (var i = 0; i < strpKaArray.length; i++) {
      valpKa[i] = parseFloat(strpKaArray[i])
      if (valpKa[i] < liquidpKa) valpKa[i] = liquidpKa
    }
    var pH = this.calpH(valpKa, c, pKw)
    var cAB = this.calpHtoc(valpKa, c, pH)
    if (!AorB) pH = pKw - pH
    var H = Math.pow(10, -pH)
    var acidOutput = " ,c=" + c + "mol/L, "
    for (var i = 0; i < valpKa.length; i++) {
      if (AorB) acidOutput = acidOutput + "pK<sub>a</sub>"
      else acidOutput = acidOutput + "pK<sub>b</sub>"
      if (valpKa.length > 1) acidOutput = acidOutput + "<sub>" + (i + 1) + "</sub>"
      acidOutput = acidOutput + "=" + strpKaArray[i] + ", "
    }
    acidOutput = acidOutput + "<br>溶液的pH为" + pH.toFixed(2) + "."
    acidOutput = acidOutput + "<br>" + "c(H<sup>+</sup>)=" + this.sciconut(H, 2) + "mol/L,"
    for (var i = 0; i < cAB.length; i++) {
      var cABoutput = "c("
      if (AorB) {
        if (i < cAB.length - 1) {
          cABoutput = cABoutput + "H"
          if (cAB.length - i > 2) cABoutput = cABoutput + "<sub>" + (cAB.length - i - 1) + "</sub>"
        }
        cABoutput = cABoutput + ABname
        if (i > 0) {
          if (i > 1) cABoutput = cABoutput + "<sup>" + (i) + "</sup>"
          cABoutput = cABoutput + "<sup>-</sup>"
        }
      } else {
        cABoutput = cABoutput + ABname
        if (cAB.length - i > 2) {
          cABoutput = cABoutput + "(OH)<sub>" + (cAB.length - i - 1) + "</sub>"
        } else if (cAB.length - i == 2) {
          cABoutput = cABoutput + "OH"
        }
        if (i > 0) {
          if (i > 1) cABoutput = cABoutput + "<sup>" + (i) + "</sup>"
          cABoutput = cABoutput + "<sup>+</sup>"
        }
      }
      cABoutput = cABoutput + ")="
      acidOutput = acidOutput + "<br>" + cABoutput + this.sciconut(cAB[i], 2) + "mol/L,"
    }
    acidOutput = acidOutput.substring(0, acidOutput.length - 1) + "."
    var acidOutputhtml = "<b>"+ABnameall +"</b>"+ acidOutput
    return acidOutputhtml
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