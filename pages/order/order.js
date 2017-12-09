var app = getApp();
var config = require('../../utils/config.js');
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    status:'123'
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
    this.setData({
      shop_name: app.globalData.shop.shop_name
    })
    wx.setNavigationBarTitle({
      title: app.globalData.shop.shop_name,
    })
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
  toOrderDetail: function(e) {
    var order_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+order_id,
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
      console.log('key:'+key)
    if (!app.globalData.key) {
      setTimeout(function () {
        _this.orderList();
      },200)
      return;
    }
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
        let arr = []
        if(res.data.success == 1) {
          if (!(res.data.responseData.length === undefined)) {
            arr = res.data.responseData;
          }
          _this.setData({
            order: arr,
          })

        }else {
          wx.showModal({
            title: '',
            content: '当前没有订单',
          })
        }
      }
    })
  },
  confirmConsume:function(ev){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Cosmetology/consumeOk',
      method:'GET',
      dataType:'POST',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key,
        order_id:ev.target.dataset.id
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str);
        if(str.success == 1){
          that.orderList();
        }
      }
    })
  }

})