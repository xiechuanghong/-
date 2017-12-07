// pages/bookInfo/bookInfo.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
        user_id = options.user_id;

    _this.setData({
      user_id: user_id
    });
    _this.bespeakExpertInfo();
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
  bespeakExpertInfo: function() {
    var _this = this,
        url   = app.globalData.url,
        data  = {
          key    : app.globalData.key,
          pro_id : config.pro_id,
          store  : config.store,
          user_id: _this.data.user_id
        };
    wx.request({
      url: url + 'Cosmetology/bespeakExpertInfo',
      data: data,
      method: 'GET',
      dataType: 'json',
      success: function(res) {

      }
    })
  },
  bespeakAdd: function() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    });
  },
  toUseCoupon: function() {
    wx.navigateTo({
      url: '../useCoupon/useCoupon',
    });
  }
})