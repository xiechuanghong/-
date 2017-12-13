// pages/mine/mine.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {},
    avatarUrl: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      avatarUrl: app.globalData.avatarUrl,
      nickName : app.globalData.nickName
    });
    _this.index();
    _this.UserInfo();
    wx.setNavigationBarTitle({
      title: app.globalData.shop.shop_name,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    

    if (app.globalData.register) { this.index()}

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.index();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  index: function() {
    var _this  = this, 
        pro_id = config.pro_id,
        store  = config.store,
        url    = app.globalData.url,
        key    = app.globalData.key;
    if(!key){
      setTimeout(function(){
        _this.index();
      },100)
      return;
    }
    wx.request({
      url: url + 'Users/index',
      data: {
        pro_id: pro_id,
        store: store,
        key: key
      },
      dataType: 'json',
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          app.globalData.mineData = res.data.responseData;
          console.log(res.data.responseData)
          _this.setData({
            userData: res.data.responseData,
          });
        }
      }
    })
  },

  toRecord: function() {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  toMyCoupon: function() {
    wx.navigateTo({
      url: '../myCoupon/myCoupon',
    })
  },
  toExtend: function() {
    var _this = this, 
        is_salesman = _this.data.userData.is_salesman;
    if (is_salesman === 0) {
      wx.navigateTo({
        url: '../generalize/generalize?salesman=' + is_salesman,
      });
    } else if (is_salesman === 1){
      wx.navigateTo({
        url: '../generalize/generalize?salesman=' + is_salesman,
      });
    } else {
      wx.navigateTo({
        url: '../center/center',
      });
    }
    
  },
  // 获取用户信息
  UserInfo:function() {
    var _this = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.rawData
        _this.setData({
          userInfo: userInfo,
        })
      }
    })
  },
  // 同步会员信息
  synchronizationInfo:function(){
    var _this  = this,
        pro_id = 100007,
        store  = config.store,
        url    = app.globalData.url,
        key    = app.globalData.key;
    wx.request({
      url: url + 'Users/syncwx',
      data: {
        pro_id: pro_id,
        store: store,
        key: key,
        userInfo: _this.data.userInfo,
      },
      method: 'POST',
      success: function (res) {
        if(res.data.success == 1) {
          wx.showToast({
            title: '同步成功',
            icon: 'success',
            duration: 2000
          })
        }
        else {
          return
        }
      }
    })
  },
  register:function(){
    console.log(22222222222222)
    wx.navigateTo({
      url: '../register/register',
    })
  },
  credit:function(){
    wx.navigateTo({
      url: '../credit/credit?wallet=' + app.globalData.mineData.wallet,
    })
  },
  myCard:function(){
    wx.navigateTo({
      url: '../myCard/myCard',
    })
  },
  clear: function() {
    wx.showLoading({
      title: '清除中',
    })
    wx.clearStorage();
    wx.showToast({
      title: '清除成功',
      icon: 'success',
      duration: 1500
    })
  }
})