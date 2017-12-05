// pages/commission/commission.js
const app=getApp();
const config=require("../../utils/config.js");
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
    this.getData();
  },
  getData:function(){
    var that=this;
    wx.request({
      url: app.globalData.url +'Salesman/getSalesmanAmount',
      method:'GET',
      dataType:'POST',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key
      },
      success:(res)=>{
        var str=JSON.parse(res.data);
        console.log(str);
        if(str.success==1){
          that.setData({
            list:str.responseData
          })
          wx.hideNavigationBarLoading();
        }
      }
    })
  },
  applyFor:function(){
    wx.navigateTo({
      url: '../applyFor/applyFor',
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
    wx.showNavigationBarLoading();
    this.onLoad();
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
})