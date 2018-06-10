// pages/exam/exam.js
var question
var app = getApp()
var elementinfo
Page({
  data: {
    question: '题目',
    output: '请选择正确答案！',
    isIpx: getApp().globalData.isIpx
  },
  onLoad: function (options) {
    var page = this
    elementinfo = app.globalData.elementinfo
    page.showquestion()
    wx.getStorage({
      key: 'wrongnumber',
      success: function (res) {
        page.setData({ correctnumber: res.data })
      },
      fail: function () {
        page.setData({ correctnumber: 0 })
      }
    })
    wx.getStorage({
      key: 'wrongnumber',
      success: function (res) {
        page.setData({ wrongnumber: res.data })
      },
      fail: function () {
        page.setData({ wrongnumber: 0 })
      }
    })
  },
  showquestion: function () {
    var page = this
    try {
      var mode = parseInt(wx.getStorageSync('exammode'))
    } catch (e) {
      var mode=2
    }
    if(!mode)mode=2
    try {
      var maxnumber = parseInt(wx.getStorageSync('exammax'))
    } catch (e) {
      var maxnumber = 86
    }
    if (!maxnumber) maxnumber=86
    var data = this.makequestion( mode, maxnumber)
    question = data[0]
    var todos = data.slice(1)
    page.setData({
      question: '题目：' + question,
      todos,
      mode
    })
  },
  answer: function ({ target: {
    dataset: {
      answer
    }
  }
  }) {
    var page = this
    var mode = page.data.mode
    var output = page.correctanswer(question, answer, mode)
    page.setData({ output })
    page.showquestion()
  },
  onShareAppMessage: function () {
    return {
      title: '元素记忆',
      path: "/pages/exam/exam"
    }
  },
  searchforkind: function (kind, x) {
    var i = elementinfo.length
    switch (kind) {
      case "ElementName":
        while (i--) {
          if (elementinfo[i].name == x) {
            return i
          }
        }
        break;
      case "ElementAbbr":
        while (i--) {
          if (elementinfo[i].symbol == x) {
            return i
          }
        }
        break;
      case "ElementNumber":
        while (i--) {
          if (elementinfo[i].number == x) {
            return i
          }
        }
        break;
      case "ElementIUPACname":
        while (i--) {
          if (elementinfo[i].iupac == x) {
            return i
          }
        }
        break;
    }
    return -1
  },
  correctanswer: function (question, answer, mode = 2) {
    var i, correct_answer
    var page = this
    switch (mode) {
      case 0: case 1: case 2:
        i = this.searchforkind("ElementName", question)
        break;
      case 3: case 4: case 5:
        i = this.searchforkind("ElementAbbr", question)
        break;
      case 6: case 7: case 8:
        i = this.searchforkind("ElementNumber", question)
        break;
      case 9: case 10: case 11:
        i = this.searchforkind("ElementIUPACname", question)
        break;
    }
    page.setData({
      imagesrc: elementinfo[i].url
    })
    switch (mode) {
      case 3: case 6: case 9:
        correct_answer = elementinfo[i].name
        break;
      case 0: case 7: case 10:
        correct_answer = elementinfo[i].symbol
        break;
      case 1: case 4: case 11:
        correct_answer = elementinfo[i].number
        break;
      case 2: case 5: case 8:
        correct_answer = elementinfo[i].iupac
        break;
    }
    if (correct_answer == answer) {
      var correctnumber = page.data.correctnumber + 1
      page.setData({ correctnumber })
      wx.setStorage({
        key: "correctnumber",
        data: correctnumber
      })
      return "回答正确！"
    } else {
      var wrongnumber = page.data.wrongnumber + 1
      page.setData({ wrongnumber })
      wx.setStorage({
        key: "wrongnumber",
        data: wrongnumber
      })
      return "回答错误，正确答案为：" + correct_answer + "，题目为：" + question + "，您的答案为：" + answer
    }
  },
  makequestion: function (mode = 2, max = 86) {
    var n = this.rand(0, max)
    var Question
    switch (mode) {
      case 0: case 1: case 2:
        Question = elementinfo[n].name
        break;
      case 3: case 4: case 5:
        Question = elementinfo[n].symbol
        break;
      case 6: case 7: case 8:
        Question = elementinfo[n].number
        break;
      case 9: case 10: case 11:
        Question = elementinfo[n].iupac
        break;
    }
    var output = [Question]
    var numbers = new Array();
    numbers.push(n)
    for (var i2 = 1; i2 < 4; i2++) {
      numbers.push(this.rand(0, max))
      for (var i3 = 0; i3 < i2; i3++) {
        while (numbers[i2] == numbers[i3]) numbers[i2] = this.rand(0, max)
      }
    }
    for (var i = 0, k = numbers.length; i < k; i++) {
      for (var j = i + 1; j < k; j++) {
        if (numbers[i] < numbers[j]) {
          var temp = numbers[j]
          numbers[j] = numbers[i]
          numbers[i] = temp
        }
      }
    }
    var option
    for (var i2 = 0; i2 < 4; i2++) {
      switch (mode) {
        case 3: case 6: case 9:
          option = elementinfo[numbers[i2]].name
          break
        case 0: case 7: case 10:
          option = elementinfo[numbers[i2]].symbol
          break
        case 1: case 4: case 11:
          option = elementinfo[numbers[i2]].number
          break
        case 2: case 5: case 8:
          option = elementinfo[numbers[i2]].iupac
          break
      }
      output.push(option)
    }
    return output
  },
  rand: function (start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  }
})