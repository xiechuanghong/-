// pages/mine/mine.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_member: 0,
    is_salesman: 0,
    is_verifier: 0,
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
          _this.setData({
            is_salesman: res.data.responseData.is_salesman,
            is_verifier: res.data.responseData.is_salesman,
            is_member  : res.data.responseData.is_member
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
        is_salesman = _this.data.is_salesman;
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
    
  }
})