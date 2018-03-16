const { User } = require('../../libs/av-weapp-min.js');

Page({
  data: {
    user: null,
    username: '',
    password: '',
    error: null,
  },
  onLoad: function () {
    this.setData({
      user: User.current(),
    });
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  updateUsername: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      username: value
    });
  },
  updatePassword: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      password: value
    });
  },
  save: function () {
    this.setData({
      error: null,
    });
    const { username, password } = this.data;
    User.logIn(username,password).then(user => {
      // 将当前的微信用户与当前登录用户关联
      return user.linkWithWeapp();
    }).catch(console.error);
    wx.showToast({
      title: '绑定成功',
      icon: 'success',
    });
  }
});