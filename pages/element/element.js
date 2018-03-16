//element.js
//获取应用实例
var app = getApp()
var inputValue 
Page({
  data: {
    button: '查询',
    output:'请输入元素名称/符号/原子序数/IUPAC名进行查询（支持拼音模糊查询，如可输入“蛤”或“ha”查询“铪”）',
    userInfo: {}
  },
  bindKeyInput: function(e) {
    inputValue=e.detail.value
  },
  element:function(){
    var  page=this
    wx.request({
        url: 'https://web.zgchemicals.mobi/api.php',
        data: {
            type:'element',
            input: inputValue
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            page.setData({
                output:res.data,
            })
        }
    })
  },
  onLoad: function (options) {
    inputValue=options.input
    if(inputValue!=null){
        this.element()
    }
  },
  onShareAppMessage: function() {
        return {
            title: '元素查询',
            path: "/pages/element/element?input="+inputValue
        }
    }
})
