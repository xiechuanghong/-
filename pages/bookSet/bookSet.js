// pages/bookSet/bookSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //--------------
    couponID: '',
    totalPrice: '0.00',
    couponAmout: '0.00',
    payPrice: '0.00',
    //--------------
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var list = decodeURIComponent(options.list);
    list = JSON.parse(list);
    this.setData({
      list:list,
      totalPrice: list.goods_price,
      payPrice: list.goods_price
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
  toUseCoupon: function() {
    wx.navigateTo({
      url: '../useCoupon/useCoupon',
    })
  },
  toTechnician: function() {
    wx.navigateTo({
      url: '../technician/technician',
    })
  }
})