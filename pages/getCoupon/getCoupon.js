// pages/getCoupon/getCoupon.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    _this.getAllCoupons();
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
  getAllCoupons: function() {
    var _this   = this,
        url     = app.globalData.url,
        key     = app.globalData.key,
        pro_id  = config.pro_id,
        store   = config.store,
        shop_id = 0,
        coupon  = [];
    wx.request({
      url: url + 'Activity/getAllCoupons',
      data: {
        pro_id : pro_id,
        store  : store,
        key    : key,
        shop_id: shop_id
      },
      dataType: 'json',
      method: 'GET',
      success: function(res) {
        console.log(res)
        if (res.data.success === 1) {
          if (!(res.data.responseData.length === undefined)) {
            coupon = res.data.responseData;
          }
          _this.setData({
            coupon: coupon
          });
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    })
  },
  receiveCoupon: function(e) {
    var _this = this,
        url = app.globalData.url,
        key = app.globalData.key,
        pro_id = config.pro_id,
        store = config.store,
        coupon_id = e.currentTarget.dataset.id;
    wx.request({
      url: url + 'Activity/receiveCoupon',
      data: {
        pro_id   : pro_id,
        store    : store,
        key      : key,
        coupon_id: coupon_id
      },
      dataType: 'json',
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (res.data.success === 1) {
          _this.getAllCoupons();
          wx.showModal({
            title: '',
            content: '领取成功',
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    })
  }
})