// pages/room/room.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    _this.getTables();
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
  getTables: function() {
    console.log(app.globalData);
    var _this = this,
        url   = app.globalData.url,
        data  = {
          pro_id : config.pro_id,
          store  : config.store,
          shop_id: app.globalData.shop.shop_id,
          time   : new Date().getTime
        };
    wx.request({
      url: url + 'Order/getTables',
      data: data,
      dataType: 'json',
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            tableList: res.data.responseData
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
  toBookRoom: function(e) {
    var _this = this,
        id    = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../bookRoom/bookRoom?id=' + id,
    })
  }
})