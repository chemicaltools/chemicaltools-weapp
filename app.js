//app.js
const AV = require("./libs/av-weapp-min.js");
AV.init({
  appId: 'wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz',
  appKey: 'QiyXtJjBHFJCIVYQRbrKFiB7',
});
App({
  onLaunch: function () {
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        let model = res.model.substring(0, res.model.indexOf("X")) + "X";
        if (model == 'iPhone X') {
          that.globalData.isIpx = true  //判断是否为iPhone X 默认为值false，iPhone X 值为true
        }
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  
    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
    }).catch(console.error);
  },
  globalData: {
    user: null,
    isIpx: false
  },
})