var app = getApp();
var config = require('../../utils/config.js');
// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    goods:[],
    payType:'',
    shopPhone: ''
  },
  orderDetail:function(){
    var _this    = this,
      order_id = _this.data.order_id,
        pro_id   = config.pro_id,
        store    = config.store,
        key      = app.globalData.key,
        url      = app.globalData.url;
    wx.request({
      url: url + 'Cosmetology/bespeakOrderInfo',
      data: {
        pro_id: pro_id,
        store: store,
        key: key,
        order_id: order_id,
      },
      method: 'GET',
      success: function (res) {
        if(res.data.success == 1){
          _this.setData({
            list:res.data.responseData,
            payType: res.data.responseData.pay_type,
            goods: res.data.responseData.goods
          })
          switch (res.data.responseData.pay_type){
            case '1':
            _this.setData({
              payType: '余额'
            })
            break;
            case '2':
            _this.setData({
              payType: '支付宝'
            })
            break;
            case '3':
            _this.setData({
              payType: '微信'
            })
            break;
            case '4':
            _this.setData({
              payType: '佣金'
            })
            break;
            case '5':
            _this.setData({
              payType: '优惠券'
            })
            break;
            case '6':
            _this.setData({
              payType: '满减'
            })
            break;
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    this.setData({
      order_id:options.id,
      shopPhone: app.globalData.shop.phone
    })
    this.orderDetail()
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
  
  }
})