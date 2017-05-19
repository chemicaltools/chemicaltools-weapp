// pages/mass/mass.js
var app = getApp()
var inputValue 
Page({
  data: {
    button: '计算',
    output:'请输入化学式，如(CH3)2CHMgBr',
    userInfo: {}
  },
  bindKeyInput: function(e) {
    inputValue=e.detail.value
  },
  mass:function(){
    var  page=this
    wx.request({
        url: 'https://njzjz.oicp.net/api.php',
        data: {
            type:'mass',
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
        this.mass()
    }
  },
    onShareAppMessage: function() {
        return {
            title: '质量查询',
            path: "/pages/mass/mass?input="+inputValue
        }
    }
})
