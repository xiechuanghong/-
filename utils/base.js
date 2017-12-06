var app = getApp();

module.exports = {
  getUserInfoSet: function () {
    var that = this;
    // console.log('getUserInfoSet')
    wx.getSetting({
      success: (res) => {
        // console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: (res) => {
              console.log('授权成功')
              that.userInfo();
            },
            fail: (res) => {
              console.log('授权失败')
              wx.openSetting({

              })
            }
          })
        } else {
          // console.log('info')
          that.userInfo();
        }
      },
      fail: (res) => {
        console.log('fail')
        console.log(res)
      }
    })
  },
  userInfo: function () {
    var app = getApp();
    var that = this;
    wx.getUserInfo({
      success: (res) => {
        // console.log('用户信息获取成功')
        // console.log(res);
        app.globalData.rawData = res.rawData;
        app.login();
      },
      fail: (res) => {
        console.log('用户信息获取失败');
        console.log(res);
      }
    })
  },
  login: function () {
    var that = this;
    wx.login({
      success: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log(res);
      }
    })
  }
}

