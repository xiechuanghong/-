// pages/myPoints/myPoints.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    sum: '0',
    integration: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    _this.integration();
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
  integration: function() {
    var _this = this,
        key = app.globalData.key,
        url = app.globalData.url,
        pro_id = config.pro_id,
        store = config.store,
        start = _this.data.start;
    wx.request({
      url: url + 'Member/integration',
      dataType: 'json',
      method: 'GET',
      data: {
        key: key,
        pro_id: pro_id,
        store: store,
      },
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            sum: res.data.responseData.sum,
            integration: res.data.responseData.integration,
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