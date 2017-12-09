// pages/myBalance/myBalance.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    add_start: 0,
    reduce_start: 0,
    sum: "0.00",
    add: [],
    reduce: [],
    add_sum: 0,
    reduce_sum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    _this.moneyInfo();
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
    if(app.globalData.credit){
      this.setData({
        reduce_start:0
      })
      this.moneyInfo();
    }
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
  changeNav: function(e) {
    var _this   = this,
        current = e.currentTarget.dataset.current;
    _this.setData({
      current: parseInt(current) 
    })
  },
  changeSwiper: function(e) {
    var _this = this,
        current = e.detail.current;
    _this.setData({
      current: current
    })
  },
  moneyInfo: function() {
    var _this = this,
        key = app.globalData.key,
        url = app.globalData.url,
        pro_id = config.pro_id,
        store = config.store,
        add_start = _this.data.add_start,
        reduce_start = _this.data.reduce_start;
    wx.request({
      url: url + 'Member/moneyInfo',
      dataType: 'json',
      data: {
        key: key,
        pro_id: pro_id,
        store: store,
        add_start: add_start,
        reduce_start: reduce_start,
      },
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            sum: res.data.responseData.sum,
            add: res.data.responseData.add,
            reduce: res.data.responseData.reduce,
            add_start: res.data.addNextStart,
            reduce_start: res.data.reduceNextStart,
            add_sum: res.data.responseData.add_sum,
            reduce_sum: res.data.responseData.reduce_sum,
          });
        }
      }
    })

  },
  credit:function(){
    wx.navigateTo({
      url: '../credit/credit?wallet='+this.data.sum,
    })
  }
})