//app.js
var config = require('utils/config.js');
var al = require('utils/base.js');
App({
  globalData: {
    userInfo: null,
    url: "https://mpe.hanyu020.com/Api/",
    staticUrl: "https://rewardstatic.hanyu020.com/",
    domain: "https://mpe.hanyu020.com/",
    host: "https://mpe.hanyu020.com",
  },
  onLaunch: function () {
    this.globalData.pro_id = config.pro_id;
    this.globalData.store = config.store;
    this.getUserInfoSet();
    this.getShopInfo();
  },
  login: function () {//获取code
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          that.getKey(res.code);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getKey: function (k) {//获取key
    var that = this;
    wx.request({
      url: this.globalData.url + 'Users/wxOnLogin',
      method: 'get',
      dataType: 'json',
      data: {
        pro_id: that.globalData.pro_id,
        store: that.globalData.store,
        code: k,
        userInfo: this.globalData.rawData
      },
      success: (res) => {
        if (res.data.success == 1) {
          console.log('成功获取key');
          that.globalData.key = res.data.responseData;
          that.userRecord();
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo;
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  getUserInfoSet: function () {
    var that = this;
    wx.getSetting({
      success: (res) => {
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
          that.userInfo();
        }
      }
    })
  },
  userInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: (res) => {
        // console.log('用户信息获取成功')
        // console.log(res);
        that.globalData.rawData = res.rawData;
        that.globalData.avatarUrl = res.userInfo.avatarUrl;
        that.globalData.nickName = res.userInfo.nickName;
        that.login();
      },
      fail: (res) => {
        console.log('用户信息获取失败');
        console.log(res);
      }
    })
  },
  getShopInfo: function () {//获取商家信息
    var that = this;
    wx.request({
      url: that.globalData.url + 'Store/index?pro_id=' + that.globalData.pro_id + '&store=' + that.globalData.store + '&shop_id=',

      method: 'get',
      success: (res) => {
        that.globalData.shop = res.data.responseData;
        that.globalData.shop_id = res.data.responseData.shop_id;
        that.getActivity();
      }
    })
  },
  userRecord: function () {
    var _this = this,
        url = _this.globalData.url,
        data = {
          pro_id: config.pro_id,
          store: config.store,
          key: _this.globalData.key
        };
    wx.request({
      url: url + 'Users/index',
      data: data,
      dataType: 'json',
      method: 'GET',
      success: function (res) {
        if (res.data.success === 1) {
          _this.globalData.gradeInfo = res.data.responseData;
          wx.downloadFile({
            url: res.data.responseData.bg_cover, //仅为示例，并非真实的资源
            success: function (res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                _this.globalData.bg_cover = res.tempFilePath;
              }
            }
          })
          wx.downloadFile({
            url: res.data.responseData.qrcode, //仅为示例，并非真实的资源
            success: function (res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                _this.globalData.qrcode = res.tempFilePath;
              }
            }
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          });
        }
      }
    });

  },
  getActivity: function () {
    var _this = this,
        url = _this.globalData.url,
        data = {
          pro_id: config.pro_id,
          store: config.store,
          shop_id: _this.globalData.shop.shop_id
        };
    wx.request({
      url: url + 'Activity/getFullMinusActivity',
      data: data,
      dataType: 'json',
      method: 'GET',
      success: function (res) {
        if (res.data.success === 1) {
          _this.globalData.activity = res.data.responseData;
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    });

  },
})
