/*
 * 2017-12-12
 * FFFFF
 */
const app = getApp();
const config = require("../../utils/config.js");
const ctx = wx.createCanvasContext('can');
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
    console.log(app.globalData);
    console.log(app.globalData.bg_cover);
    console.log(app.globalData.qrcode);
    console.log(ctx)
    this.getShopInfo();
    this.can = wx.createCanvasContext('can');
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        ctx.drawImage(app.globalData.bg_cover, 0, 0, res.windowWidth, res.windowHeight);
      },
    });
    ctx.setFontSize(24);
    ctx.setFillStyle('#FFFFFF');   
    ctx.fillText(app.globalData.nickName, 140, 50);
    ctx.setFontSize(14);
    ctx.fillText('我为' + app.globalData.shop.shop_name + '小程序代言', 140, 80);
    ctx.arc(90, 55, 30, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(app.globalData.avatarUrl, 60, 25, 60, 60);
    ctx.draw();
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
    wx.stopPullDownRefresh();
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
    
  }
});