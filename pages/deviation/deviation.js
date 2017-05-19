// pages/deviation/deviation.js
var app = getApp()
var inputValue 
Page({
  data: {
    button: '计算',
    output:'请输入数字，每行一个，如：\n1.723\n1.731\n1.729',
    userInfo: {}
  },
  bindKeyInput: function(e) {
    inputValue=e.detail.value
  },
  deviation:function(){
    var  page=this
    wx.request({
        url: 'https://njzjz.oicp.net/api.php',
        data: {
            type:'deviation',
            input: inputValue
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            page.setData({
                output:res.data
            })
        }
    })
  },
  onLoad: function (options) {
    inputValue=options.input
    if(inputValue!=null){
        this.deviation()
    }
  },
    onShareAppMessage: function() {
        return {
            title: '偏差计算',
            path: "/pages/deviation/deviation?input="+inputValue
        }
    }
})
