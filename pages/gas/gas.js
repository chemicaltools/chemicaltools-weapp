// pages/gas/gas.js
var mode,p,V,n,T
mode="p"
Page({
  data: {
    button: '勾选需要计算的量，点击计算',
    p:'',
    V:'',
    n:'',
    T:''
  },
  radioChange: function(e) {
    mode=e.detail.value
  },
  bindKeyInputp: function(e) {
    p=e.detail.value
  },
   bindKeyInputV: function(e) {
    V=e.detail.value
  },
   bindKeyInputn: function(e) {
    n=e.detail.value
  },
   bindKeyInputT: function(e) {
    T=e.detail.value
  },
  gas:function(){
    var  page=this
    wx.request({
      url: 'https://web.zgchemicals.mobi/api.php',
        data: {
            type:'gas',
            mode: mode,
            p:p,
            V:V,
            n:n,
            T:T
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          if(mode=="p"){
            page.setData({
                p:res.data,
            })
          }else if(mode=="V"){
            page.setData({
                V:res.data,
            })
          }else if(mode=="n"){
            page.setData({
                n:res.data,
            })
          }else if(mode=="T"){
            page.setData({
                T:res.data,
            })
          }
        }
    })
  },
  onShareAppMessage: function() {
        return {
            title: '气体计算',
            path: "/pages/gas/gas"
        }
    }
})