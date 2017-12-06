// pages/center/center.js
const config=require('../../utils/config.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: '',
    add_up_amount: '',
    salesman_sum: '',
    salesman_time: '',
    withdraw: '',
    order: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // _this.salesmanIndex();
    wx.stopPullDownRefresh();
    wx.hideLoading();
  },
  code:function(){
    wx.navigateTo({
      url: '../drawimg/drawimg',
    })
  },
  commission:function(){
    wx.navigateTo({
      url: '../commission/commission',
    })
  },
  applyFor:function(){
    wx.navigateTo({
      url: '../applyFor/applyFor',
    })
  },
  cashDetail:function(){
    wx.navigateTo({
      url: '../cashDetail/cashDetail',
    })
  },
  getData:function(){
    var that=this;
    wx.request({
      url: app.globalData.url +'Salesman/index',
      method:'GET',
      dataType:'JSON',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key
      },
      success:(res)=>{
        var str=JSON.parse(res.data);
        console.log(str);

      }
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
    // this.getData();
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
    var _this = this;
    wx.showLoading();
    _this.onLoad();
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
  tapFans: function() {
    wx.navigateTo({
      url: '../fans/fans',
    })
  },
  tapExtend: function() {
    wx.navigateTo({
      url: '../extendOrder/extendOrder',
    })
  },
  tapCash: function() {
    wx.navigateTo({
      url: '../cashDetail/cashDetail',
    })
  },
  salesmanIndex: function() {
    var _this = this;
    wx.request({
      url: app.globalData.url + 'Salesman/index',
      data: {
        key: app.globalData.key,
        pro_id: config.pro_id,
        store: config.store
      },
      dataType: 'json',
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            amount: res.data.responseData.amount,
            add_up_amount: res.data.responseData.add_up_amount,
            salesman_sum: res.data.responseData.salesman_sum,
            salesman_time: res.data.responseData.salesman_time,
            withdraw: res.data.responseData.withdraw,
            order: res.data.responseData.order
          });
          app.globalData.amount = res.data.responseData.amount;
          app.globalData.add_up_amount = res.data.responseData.add_up_amount;
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
          })
        }
      }
    })
  },
  draw:function(){
    wx.redirectTo({
      url: '../drawimg/drawimg',
    })
  }
})