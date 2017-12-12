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
    dprHeight: 1,
    dprWidth: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    console.log(app.globalData.bg_cover);
    console.log(app.globalData.qrcode);
    console.log(ctx);
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          dprHeight: res.windowHeight / 603,
          dprWidth: res.windowWidth / 375
        })
        ctx.drawImage(app.globalData.bg_cover, 0, 0, res.windowWidth, res.windowHeight);
        ctx.drawImage(app.globalData.qrcode, (res.windowWidth - 92 * _this.data.dprWidth) / 2, 160 , 92 * _this.data.dprWidth, 92 * _this.data.dprWidth);
      },
    });
    ctx.setFontSize(24 * _this.data.dprWidth);
    ctx.setFillStyle('#FFFFFF');   
    ctx.fillText(app.globalData.nickName, 140 * _this.data.dprWidth, 50 * _this.data.dprHeight);
    ctx.setFontSize(14 * _this.data.dprWidth);
    ctx.fillText('我为' + app.globalData.shop.shop_name + '小程序代言', 140 * _this.data.dprWidth, 80 * _this.data.dprHeight);
    ctx.arc(90, 55, 30, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(app.globalData.avatarImg, 60, 25, 60, 60);
    ctx.restore();
    
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
    
  },
  
});