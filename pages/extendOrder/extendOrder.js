// pages/cashDetail/cashDetail.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: 0,
    current: 0,
    orderData: {
      0: [],
      3: [],
      1: [],
      4: [],
    },
    start: {
      0: 0,
      3: 0,
      1: 0,
      4: 0,
    },
    hasmore: {
      0: false,
      3: false,
      1: false,
      4: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          swiperHeight: res.windowHeight - 195 - 60
        })
      },
    });
    _this.salesmanOrder(0);
    _this.salesmanOrder(3);
    _this.salesmanOrder(1);
    _this.salesmanOrder(4);

    wx.stopPullDownRefresh();
    _this.setData({
      add_up_amount: app.globalData.add_up_amount
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
    this.onLoad();
    wx.showLoading();
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
  tapNav: function (e) {
    var _this = this,
      current = parseInt(e.currentTarget.dataset.current);
    _this.setData({
      current: current
    });
  },
  changeSwiper: function (e) {
    var _this = this,
      current = e.detail.current;
    _this.setData({
      current: current
    });
  },
  salesmanOrder: function (status, start) {
    var _this = this,
        url = app.globalData.url,
        key = app.globalData.key,
        pro_id = config.pro_id,
        store = config.store,
        orderData = _this.data.orderData,
        start = _this.data.start,
        hasmore = _this.data.hasmore;
    wx.request({
      url: url + 'Salesman/salesmanOrder',
      data: {
        pro_id: pro_id,
        key: key,
        store: store,
        status: status,
        start: start[status]
      },
      dataType: 'json',
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          orderData[status] = res.data.responseData;
          start[status] = res.data.responseData.nextStart;
          hasmore[status] = res.data.responseData.hasMore;
          _this.setData({
            orderData: orderData,
            start: start,
            hasmore: hasmore
          });
        }
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  }
})