//app.js
const AV = require('./libs/av-weapp-min.js');
AV.init({
  appId: 'wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz',
  appKey: 'QiyXtJjBHFJCIVYQRbrKFiB7',
});

App({
  onLaunch: function () {
    var that=this
    this.getelementinfo()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
    }).catch(console.error);
    const user = AV.User.current();
    wx.getUserInfo({
      success: ({ userInfo }) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
          this.globalData.user = user.toJSON();
        }).catch(console.error);
      }
    });
  },
  globalData: {
    userInfo: null,
    user: null,
    isIpx: false
  },
  getelementinfo: function () {
    var that = this
    wx.request({
      url: 'https://test-10061032.cossh.myqcloud.com/wx/element.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.globalData.elementinfo = res.data
        if (getCurrentPages().length != 0) {
          getCurrentPages()[getCurrentPages().length - 1].onLoad(getCurrentPages()[getCurrentPages().length - 1].options)
        }
      }
    })
  },
})