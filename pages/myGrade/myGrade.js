// pages/myGrade/myGrade.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: 0,
    grade_name: '',
    prerogative: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      nickName:app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl
    });
    this.memberGrade();
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
  memberGrade: function() {
    var _this  = this,
        key    = app.globalData.key,
        url    = app.globalData.url,
        pro_id = config.pro_id,
        store  = config.store;
    wx.request({
      url: url + 'Member/MemberGrade',
      dataType: 'json',
      data: {
        key: key,
        pro_id: pro_id,
        store: store
      },
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          var grade_name = '';
          for (var i = 0; i < res.data.responseData.grade_name.length; i ++) {
            if (res.data.responseData.grade_name[i].level === res.data.responseData.grade.grade_level) {
              grade_name = res.data.responseData.grade_name[i].grade_name
            }
          }
          _this.setData({
            grade: res.data.responseData.grade.grade_level,
            grade_name: grade_name,
            prerogative: res.data.responseData.prerogative
          });
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    })
  }
})