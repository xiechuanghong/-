var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_id: 0,
    prerogative: '',
    service_phone: '',
    note: {},
    business_service: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      card_id: options.card_id
    });
    _this.getCardInfo();
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
  getCardInfo: function() {
    var _this = this,
        url = app.globalData.url,
        key = app.globalData.key,
        pro_id = config.pro_id,
        store = config.store,
        card_id = _this.data.card_id;
    wx.request({
      url: url + 'WxMemberCard/getCardInfo',
      dataType: 'json',
      data: {
        pro_id: pro_id,
        store: store,
        card_id: card_id
      },
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            prerogative: res.data.responseData.prerogative,
            service_phone: res.data.responseData.service_phone,
            note: res.data.responseData.note,
            business_service: res.data.responseData.business_service
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