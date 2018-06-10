// pages/mass/mass.js
var app = getApp()
var inputValue
var elementinfo
Page({
  data: {
    button: '计算',
    output: '请输入化学式，如(CH<sub>3</sub>)<sub>2</sub>CHMgBr',
    placeholder: '分子式',
    userInfo: {}
  },
  bindKeyInput: function (e) {
    inputValue = e.detail.value
  },
  getmass: function () {
    var page = this
    var output = page.calculateMass(inputValue)
    page.setData({ output })

  },
  onLoad: function (options) {
    inputValue = options.input
    elementinfo = app.globalData.elementinfo
    if (inputValue != null) {
      this.getmass()
    }
  },
  onShareAppMessage: function () {
    return {
      title: '质量查询',
      path: "/pages/mass/mass?input=" + inputValue
    }
  },
  calAsc: function (x) {
    var c = x.substr(0, 1)
    var n = c.charCodeAt()
    if (n > 64 & n < 91)
      return 1
    else if (n > 96 & n < 123)
      return 2
    else if (n > 47 & n < 58)
      return 3
    else if (n == 40 | n == 91 | n == -23640)
      return 4
    else if (n == 41 | n == 93 | n == -23639)
      return 5
    else
      return 0
  },
  ElementChoose: function (x) {
    var i = elementinfo.length
    while (i--) {
      if (elementinfo[i].symbol == x) {
        return i
      }
    }
    return -1
  },
  calculateMass: function (x) {
    var that = this
    var output
    var l = x.length
    var i = 0
    var s = 0
    var m = 0
    var massPer = new Array()
    var y1 = ""
    var y2 = ""
    var y3 = ""
    var y4 = ""
    var T = ""
    var AtomNumber = new Int8Array(118)
    var MulNumber = new Array()
    var MulIf = new Array()
    var MulLeft = new Array()
    var MulRight = new Array()
    var MulNum = new Array()
    var n, i2, i3, c
    if (l > 0) {
      while (i < l) {
        i++
        MulNumber[i] = 1
        y1 = x.substr(i - 1, 1)
        if (that.calAsc(y1) == 4)
          MulIf[i] = 1
        else if (that.calAsc(y1) == 5)
          MulIf[i] = -1
        else
          MulIf[i] = 0
        s = s + MulIf[i]
      }
      if (s == 0) {
        i = 1
        var n = 0
        while (i < l) {
          if (MulIf[i] == 1) {
            n++
            var c = 1
            var i2 = i + 1
            MulLeft[n] = i
            while (c > 0) {
              c = c + MulIf[i2]
              i2++
            }
            i2 = i2 - 1
            MulRight[n] = i2
            if (i2 + 1 > l)
              y3 = "a"
            else
              y3 = x.substr(i2, 1)
            if (that.calAsc(y3) == 3) {
              if (i2 + 2 > l)
                y4 = "a"
              else
                y4 = x.substr(i2 + 1, 1)
              if (that.calAsc(y4) == 3)
                MulNum[n] = parseInt(y3 + y4)
              else
                MulNum[n] = parseInt(y3)
            } else {
              MulNum[n] = 1
            }
          }
          i++
        }
        i = 0
        while (i < n) {
          i++
          for (var i2 = MulLeft[i]; i2 <= MulRight[i]; i2++)
            MulNumber[i2] = MulNumber[i2] * MulNum[i]
        }
        i = 0
        while (i < l) {
          i++
          y1 = x.substr(i - 1, 1)
          if (that.calAsc(y1) == 1) {
            if (i >= l)
              y2 = "1"
            else
              y2 = x.substr(i, 1)
            if (that.calAsc(y2) == 2) {
              T = y1 + y2
              n = that.ElementChoose(T)
              if (n >= 0) {
                if (i + 1 >= l)
                  y3 = "1"
                else
                  y3 = x.substr(i + 1, 1)
                if (that.calAsc(y3) == 3) {
                  if (i + 2 >= l)
                    y4 = "a"
                  else
                    y4 = x.substr(i + 2, 1)
                  if (that.calAsc(y4) == 3) {
                    AtomNumber[n] = AtomNumber[n] + parseInt(y3 + y4) * MulNumber[i]
                    i = i + 3
                  } else {
                    AtomNumber[n] = AtomNumber[n] + parseInt(y3) * MulNumber[i]
                    i = i + 2
                  }
                } else {
                  AtomNumber[n] = AtomNumber[n] + MulNumber[i]
                  i++
                }
              }
            } else if (that.calAsc(y2) == 3) {
              n = that.ElementChoose(y1)
              if (n >= 0) {
                if (i + 1 >= l)
                  y3 = "a"
                else
                  y3 = x.substr(i + 1, 1)
                if (that.calAsc(y3) == 3) {
                  AtomNumber[n] = AtomNumber[n] + parseInt(y2 + y3) * MulNumber[i]
                  i = i + 2
                } else {
                  AtomNumber[n] = AtomNumber[n] + parseInt(y2) * MulNumber[i]
                }
              }
            } else {
              n = that.ElementChoose(y1)
              if (n >= 0)
                AtomNumber[n] = AtomNumber[n] + MulNumber[i]
            }
          } else if (that.calAsc(y1) == 4) {
          } else if (that.calAsc(y1) == 5) {
            if (i >= l)
              y2 = "a"
            else
              y2 = x.substr(i, 1)
            if (that.calAsc(y2) == 3) {
              if (i + 1 >= l)
                y2 = "a"
              else
                y3 = x.substr(i + 1, 1)
              if (that.calAsc(y3) == 3) i++
              i++
            }
          }
        }
        for (i = 0; i < 118; i++) {
          if (AtomNumber[i] > 0) {
            m = m + AtomNumber[i] * parseFloat(elementinfo[i].mass)
          }
        }
      }
    }
    if (m > 0) {
      var xHtml = ""
      for (var i3 = 0; i3 < l; i3++) {
        if (x.substr(i3, 1).charCodeAt() >= 48 && x.substr(i3, 1).charCodeAt() <= 57) {
          xHtml = xHtml + "<sub>" + x.substr(i3, 1) + "</sub>"
        } else {
          xHtml = xHtml + x.substr(i3, 1)
        }
      }
      output = "<b>"+xHtml + "</b><br><b>相对分子质量</b>=" + m.toFixed(2)
      var outputhtml = output
      for (i = 0; i < 118; i++) {
        if (AtomNumber[i] > 0) {
          massPer[i] = parseFloat(AtomNumber[i]) * (parseFloat(elementinfo[i].mass)) / parseFloat(m) * 100
          output = output + "<br><b>" + elementinfo[i].name + "</b>（符号：" + elementinfo[i].symbol + "），" + AtomNumber[i] + "个原子，原子量为" + parseFloat(elementinfo[i].mass).toFixed(2) + "，质量分数为" + massPer[i].toFixed(2) + "%；"
        }
      }
      output = output.substring(0, output.length - 1) + "。"
    } else {
      output = "输入出错！"
    }
    return output
  },
})
