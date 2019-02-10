// pages/exam/exam.js
var question
const chemicaltools = require("chemicaltools")
Page({
  data: {
    question: '题目',
    output: '请选择正确答案！',
    isIpx: getApp().globalData.isIpx
  },
  onLoad: function(options) {
    var page = this
    this.showquestion()
    wx.getStorage({
      key: 'wrongnumber',
      success: function(res) {
        page.setData({
          correctnumber: res.data
        })
      },
      fail: function() {
        page.setData({
          correctnumber: 0
        })
      }
    })
    wx.getStorage({
      key: 'wrongnumber',
      success: function(res) {
        page.setData({
          wrongnumber: res.data
        })
      },
      fail: function() {
        page.setData({
          wrongnumber: 0
        })
      }
    })
  },
  showquestion: function() {
    var page = this
    try {
      var mode = parseInt(wx.getStorageSync('exammode'))
    } catch (e) {
      var mode = 2
    }
    if (isNaN(mode)) mode = 2
    try {
      var maxnumber = parseInt(wx.getStorageSync('exammax'))
    } catch (e) {
      var maxnumber = 86
    }
    if (isNaN(maxnumber)) maxnumber = 86
    var data = chemicaltools.makeQuestion(this.questionname(mode),this.answername(mode), maxnumber)
    question = data.question
    page.setData({
      question: '题目：' + data.question,
      todos: data.options,
      mode
    })
  },
  answer: function({
    target: {
      dataset: {
        answer
      }
    }
  }) {
    var page = this
    var mode = page.data.mode
    var output = page.correctanswer(question, answer, mode)
    page.setData({
      output
    })
    page.showquestion()
  },
  onShareAppMessage: function() {
    return {
      title: '元素记忆',
      path: "/pages/exam/exam"
    }
  },

  correctanswer: function(question, answer, mode = 2) {
    var result = chemicaltools.correctAnswer(question, answer, this.questionname(mode), this.answername(mode))
    this.setData({
      imagesrc: chemicaltools.searchElement(result.question).url
    })
    if (result.correct) {
      var correctnumber = this.data.correctnumber + 1
      this.setData({
        correctnumber
      })
      wx.setStorage({
        key: "correctnumber",
        data: correctnumber
      })
      return "回答正确！"
    } else {
      var wrongnumber = this.data.wrongnumber + 1
      this.setData({
        wrongnumber
      })
      wx.setStorage({
        key: "wrongnumber",
        data: wrongnumber
      })
      return "回答错误，正确答案为：" + result.correct_answer + "，题目为：" + question + "，您的答案为：" + answer
    }
  },

  questionname: function(mode) {
    switch (mode) {
      case 0:
      case 1:
      case 2:
        return "name"
      case 3:
      case 4:
      case 5:
        return "symbol"
      case 6:
      case 7:
      case 8:
        return "number"
      case 9:
      case 10:
      case 11:
        return "iupac"
    }
  },
  answername: function(mode) {
    switch (mode) {
      case 3:
      case 6:
      case 9:
        return "name"
      case 0:
      case 7:
      case 10:
        return "symbol"
      case 1:
      case 4:
      case 11:
        return "number"
      case 2:
      case 5:
      case 8:
        return "iupac"
    }
  },
})