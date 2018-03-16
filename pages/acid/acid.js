// pages/acid/acid.js
var mode,pKa,c
mode="acid"
Page({
  data: {
    items: [
      {name: 'acid', value: '酸', checked: 'true'},
      {name: 'base', value: '碱'},
    ],
    pKaorpKb:"pKa",
    c:'分析浓度c',
    button:'计算',
    output:'请输入酸和碱的pKa和分析浓度进行计算！',
  },
  radioChange: function(e) {
    var  page=this
    mode= e.detail.value
    if(mode=="acid"){
      page.setData({
                pKaorpKb:"pKa",
            })
    }else{
      page.setData({
                pKaorpKb:"pKb",
            })
    }
  },
  acid:function(){
    var  page=this
    wx.request({
      url: 'https://web.zgchemicals.mobi/api.php',
        data: {
            type:'acid',
            c: c,
            pKa:pKa,
            AorB:mode
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
  bindKeyInputc: function(e) {
    c=e.detail.value
  },
  bindKeyInputpKa: function(e) {
    pKa=e.detail.value
  },
  onShareAppMessage: function() {
        return {
            title: '酸碱计算',
            path: "/pages/acid/acid"
        }
    }
})