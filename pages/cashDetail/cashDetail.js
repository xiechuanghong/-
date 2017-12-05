// pages/cashDetail/cashDetail.js
const app=getApp();
const config=require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: 0,
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.showLoading();
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          swiperHeight: res.windowHeight - 195 - 60,
          amount: app.globalData.amount
        })
      },
    })

    _this.getData();
    wx.stopPullDownRefresh();
  },
  getData:function(){
    var that=this;
    wx.request({
      url: app.globalData.url +'Salesman/getWithdraw',
      method:'GET',
      dataType:'JSON',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key,
        status:''
      },
      success:(res)=>{
        var str=JSON.parse(res.data);
        console.log(str);
        var allList = [],
            check = [],
            pay = [],
            payed = [];
        if (str.responseData.length) {
          for (var i = 0; i < str.responseData.length; i++) {
            if (str.responseData[i].status === '0') {
              check.push(str.responseData[i]);
            } else if (str.responseData[i].status === '1') {
              pay.push(str.responseData[i]);
            } else if (str.responseData[i].status === '3') {
              payed.push(str.responseData[i]);
            }
          }
          allList = str.responseData;
        }
        that.setData({
          allList: allList,
          check: check,
          pay: pay,
          payed: payed,
        });
      },
      complete: function() {
        wx.hideLoading();
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
    this.onLoad();
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
  tapNav: function(e) {
    var _this = this,
        current = parseInt(e.currentTarget.dataset.current);
    _this.setData({
      current: current
    });
  },
  changeSwiper: function(e) {
    var _this = this,
        current = e.detail.current;
    _this.setData({
      current: current
    });
  }
})