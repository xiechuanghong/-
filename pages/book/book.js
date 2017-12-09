// pages/book/book.js
var app = getApp();
var config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {},
    start: 0,
    expert: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.bespeakExpert();

    _this.setData({
      shop: app.globalData.shop
    })
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
    wx.stopPullDownRefresh()
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
  toBookInof: function (e) {
    var user_id = e.currentTarget.dataset.user_id;
    wx.navigateTo({
      url: '../bookInfo/bookInfo?user_id=' + user_id,
    })
  },
  bespeakExpert: function() {
    var _this = this,
        url   = app.globalData.url,
        data  = {
          key    : app.globalData.key,
          pro_id : config.pro_id,
          store  : config.store,
          start  : _this.data.start
        }
        
    wx.request({
      url: url + 'Cosmetology/bespeakExpert',
      data: data,
      dataType: 'json',
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            expert: res.data.responseData,
            start: res.data.nextStart
          });
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