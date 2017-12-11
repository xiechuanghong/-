// pages/record/record.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserCashFlow()
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
  getUserCashFlow: function () {
    var _this = this,
      pro_id = config.pro_id,
      store = config.store,
      url = app.globalData.url,
      key = app.globalData.key;
    wx.request({
      url: url + 'Users/getUserCashFlow',
      data: {
        pro_id: pro_id,
        store: store,
        key: key,
        start:'0'
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        if(res.data.success == 1){
          _this.setData({
            record: res.data.responseData
          })
          console.log("请求成功")
        }
        else {
          console.log("请求失败")
          return
        }
      }
    })
  }
})