// pages/fans/fans.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: 0,
    current: 0,
    gradeOne: [],
    gradeTwo: [],
    gradeOneNum: 0,
    gradeTwoNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          swiperHeight: res.windowHeight - 62
        });
        console.log(res);
      }
    });
    _this.getPreOrSub(1);
    _this.getPreOrSub(2);
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

    this.getPreOrSub(1);
    this.getPreOrSub(2);
    
    
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
  tapBar: function(e) {
    var _this = this,
        current = parseInt(e.currentTarget.dataset.current);
    _this.setData({
      current: current
    });
  },
  changeSwiper: function(e) {
    var _this = this,
        current = e.detail.current;
    _this.setData({
      current: current
    });
  },
  getPreOrSub: function (grade) {
    wx.showLoading();
    var _this = this,
        url = app.globalData.url,
        key = app.globalData.key,
        pro_id = config.pro_id,
        store = config.store;
    wx.request({
      url: url + 'Salesman/getPreOrSub',
      data: {
        key: key,
        pro_id: pro_id,
        store: store,
        grade: grade
      },
      dataType: 'json',
      method: 'GET',
      success: function(res) {
       
        wx.hideLoading();
        if (res.data.success === 1) {
          if (grade === 1) {
            _this.setData({
              gradeOne: res.data.responseData.infos,
              gradeOneNum: res.data.responseData.total_quantity
            });
          } else {
            _this.setData({
              gradeTwo: res.data.responseData.infos,
              gradeTwoNum: res.data.responseData.total_quantity
            });
          }
        }
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  }
})