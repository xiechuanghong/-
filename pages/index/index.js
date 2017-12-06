// index/index.js
var app    = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

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
    var pro_id = config.pro_id,
        store  = config.store,
        url    = app.globalData.url;
    wx.request({
      url: url + 'Index/index',
      data: {
        pro_id: pro_id,
        store: store
      },
      dataType: 'json',
      method: "GET",
      success: function(res) {
        console.log(res);
      }
    })
  },
  toSet: function() {
    wx.navigateTo({
      url: '../set/set',
    })
  },
  toBookInof: function() {
    wx.navigateTo({
      url: '../bookInfo/bookInfo',
    })
  },
  toPay: function() {
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  toGetCoupon: function() {
    wx.navigateTo({
      url: '../getCoupon/getCoupon',
    })
  },
  toBookSet: function() {
    wx.navigateTo({
      url: '../bookSet/bookSet',
    })
  },
  toSetDetail: function() {
    wx.navigateTo({
      url: '../setDetail/setDetail',
    })
  },
  toAbout:function() {
    wx.navigateTo({
      url: '../about/about',
    })
  }
})