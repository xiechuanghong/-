var app = getApp();
var config = require('../../utils/config.js');
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.orderList()
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
  toOrderDetail: function() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
  },
  toEvaluate: function() {
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  },
  orderList:function(){
    var _this = this,
      pro_id  = config.pro_id,
      store   = config.store,
      key     = app.globalData.key,
      url     = app.globalData.url;
    wx.request({
      url: url + 'Cosmetology/bespeakPay',
      data: {
        pro_id: pro_id,
        store: store,
        key: key
      },
      method:'GET',
      success:function(res){
        console.log(res)
        if(res.data.success == 1) {
          _this.setData({
            order:res.data.responseData
          })
        }else {
          wx.showModal({
            title: '',
            content: '',
          })
        }
      }
    })
  }

})