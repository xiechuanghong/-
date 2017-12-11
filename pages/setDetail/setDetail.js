// pages/setDetail/setDetail.js
var app = getApp();
var config = require('../../utils/config.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aBtn:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getList(options.goods_id);
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
  toBookSet: function() {
    var list = this.data.list;
    list = JSON.stringify(list);
    list = encodeURIComponent(list);
    wx.navigateTo({
      url: '../bookSet/bookSet?list='+list,
    })
  },
  getList:function(id){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Cosmetology/bespeakGoodsInfo',
      method:'GET',
      dataType:'JSON',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key,
        goods_id:id
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str)
        if(str.success == 1){
          var imgs = str.responseData.comment;
          for(var i=0; i<imgs.length; i++){
            imgs[i].img_urls = imgs[i].img_urls.split(',');
          }
          that.setData({
            list:str.responseData
          })
          var article = str.responseData.goods_detail;
          WxParse.wxParse('article', 'html', article , that, 5);
        }
      }
    })
  },
  aBtn:function(ev){
    if(!ev.target.dataset.id){return;}
    this.setData({
      aBtn:ev.target.dataset.id
    })
  }
})