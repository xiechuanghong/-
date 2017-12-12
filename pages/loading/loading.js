// pages/loading/loading.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    salesman: '',
    per_key: '',
    upper: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
        pre_key = options.pre_key,
        upper = options.upper;
      
      wx.request({
        url: app.globalData.url + 'Salesman/firstSalesman',
        data: {
          key: app.globalData.key,
          pro_id: config.pro_id,
          store: config.store,
          pre_key: pre_key
        },
        dataType: 'json',
        method: 'GET',
        success: function (res) {//0.不是推广员,1.审核中,2.通过审核
          if (res.data.success === 1) {
            _this.setData({
              salesman: res.data.responseData,
              pre_key: pre_key,
              upper: upper
            });
          } else {
            wx.showModal({
              title: '',
              content: res.data.message,
            })
          }
        }
      });
      
    
    // setTimeout(function() {
    //   _this.toIndex();
    // }, 1000);
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
    var _this = this;
    setTimeout(function () {
      _this.redirect();
    }, 1000);
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
  redirect: function() {
    var _this = this,
        salesman = _this.data.salesman,
        pre_key = _this.data.pre_key,
        upper = _this.data.upper;
    console.log(salesman, pre_key, upper);
    console.log('---------------------');
    console.log(salesman === 2);
    if (salesman === 2) {
      wx.navigateTo({
        url: '../center/center',
      });
    } else {
      wx.navigateTo({
        url: '../generalize/generalize?pre_key=' + pre_key + '&salesman=' + salesman + '&upper=' + upper,
      })
    }
  }
})