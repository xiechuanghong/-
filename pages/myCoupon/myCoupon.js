// pages/myCoupon/myCoupon.js
var app = getApp();
var config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    available: {
      start: 0,
      type: 0,
      arr: []
    },
    used: {
      start: 0,
      type: 1,
      arr: []
    },
    overtime: {
      start: 0,
      type: 2,
      arr: []
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    _this.getUserCouponsBy(_this.data.available, _this.setAvailable);
    _this.getUserCouponsBy(_this.data.used, _this.setUsed);
    _this.getUserCouponsBy(_this.data.overtime, _this.setOvertime);
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
  changeSwiper: function(e) {
    var _this = this,
        current = e.detail.current;

    _this.setData({
      current: current
    });
  },
  tapNav: function(e) {
    var _this = this,
        current = parseInt(e.currentTarget.dataset.current);
    _this.setData({
      current: current
    })
  },
  getUserCouponsBy: function(obj, callback) {
    var _this  = this,
        key    = app.globalData.key,
        url    = app.globalData.url,
        pro_id = config.pro_id,
        store  = config.store,
        start  = obj.start,
        type   = obj.type;
    wx.request({
      url: url + 'Users/getUserCouponsBy',
      data: {
        pro_id: pro_id,
        store : store,
        start : start,
        type  : type,
        key   : key
      },
      dataType: 'json',
      method: 'POST',
      success: function(res) {
        if (res.data.success === 1) {
          callback(res.data.responseData, res.data.nextStart);
        }
      }
    })
  },
  setAvailable: function(arr, start) {
    var available = this.data.available;
    available.arr = arr;
    available.start = start;
    this.setData({
      available: available
    });
  },
  setUsed: function (arr, start) {
    var used = this.data.used;
    used.arr = arr;
    used.start = start;
    this.setData({
      used: used
    });
  },
  setOvertime: function (arr, start) {
    var overtime = this.data.overtime;
    overtime.arr = arr;
    overtime.start = start;
    this.setData({
      overtime: overtime
    });
  }
})