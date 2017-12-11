// pages/mine/mine.js
var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    stars: [false, false, false, false, false],
    key: 0,//评分
  },
  rating:function(){
    var arrStar = app.globalData.shop.star
    var arrStars = this.data.stars
    for (var i = 0; i < arrStar ; i ++){
      arrStars[i] = true      
   }
   this.setData({
     stars: arrStars
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shop: app.globalData.shop,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.rating()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.shop)
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
  
  }
})