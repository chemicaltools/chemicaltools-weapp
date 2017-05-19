// pages/exam/exam.js
var question,A,B,C,D
Page({
  data:{
    question:'题目',
    A:"A",
    B:'B',
    C:'C',
    D:'D',
    output:'请选择正确答案！'
  },
  onLoad:function(options){
     var  page=this
    wx.request({
        url: 'https://njzjz.oicp.net/api.php',
        data: {
            type:'exam',
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
                        question=res.data.split(" ")[3],
                        A=res.data.split(" ")[5],
                B=res.data.split(" ")[7],
                C=res.data.split(" ")[9],
                D=res.data.split(" ")[11],
            page.setData({
                question:'题目：'+question,
                A:A,
                B:B,
                C:C,
                D:D
            })
        }
    })
  },
   A:function(){
     var  page=this
    wx.request({
        url: 'https://njzjz.oicp.net/api.php',
        data: {
            type:'exam',
            question:question,
            answer:A
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          question=res.data.split(" ")[4],
          A=res.data.split(" ")[6],
          B=res.data.split(" ")[8],
          C=res.data.split(" ")[10],
          D=res.data.split(" ")[12],
            page.setData({
                output:res.data.split(" ")[1],
                question:'题目：'+question,
                A:A,
                B:B,
                C:C,
                D:D
            })
        }
    })
  },
  B:function(){
     var  page=this
    wx.request({
        url: 'https://njzjz.oicp.net/api.php',
        data: {
            type:'exam',
            question:question,
            answer:B
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          question=res.data.split(" ")[4],
          A=res.data.split(" ")[6],
          B=res.data.split(" ")[8],
          C=res.data.split(" ")[10],
          D=res.data.split(" ")[12],
            page.setData({
                output:res.data.split(" ")[1],
                question:'题目：'+question,
                A:A,
                B:B,
                C:C,
                D:D
            })
        }
    })
    },
  C:function(){
     var  page=this
    wx.request({
        url: 'https://njzjz.oicp.net/api.php',
        data: {
            type:'exam',
            question:question,
            answer:C
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          question=res.data.split(" ")[4],
          A=res.data.split(" ")[6],
          B=res.data.split(" ")[8],
          C=res.data.split(" ")[10],
          D=res.data.split(" ")[12],
            page.setData({
                output:res.data.split(" ")[1],
                question:'题目：'+question,
                A:A,
                B:B,
                C:C,
                D:D
            })
        }
    })  },
  D:function(){
     var  page=this
    wx.request({
        url: 'https://njzjz.oicp.net/api.php',
        data: {
            type:'exam',
            question:question,
            answer:D
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          question=res.data.split(" ")[4],
          A=res.data.split(" ")[6],
          B=res.data.split(" ")[8],
          C=res.data.split(" ")[10],
          D=res.data.split(" ")[12],
            page.setData({
                output:res.data.split(" ")[1],
                question:'题目：'+question,
                A:A,
                B:B,
                C:C,
                D:D
            })
        }
    })  },
     onShareAppMessage: function() {
        return {
            title: '元素记忆',
            path: "/pages/exam/exam"
        }
    }
})