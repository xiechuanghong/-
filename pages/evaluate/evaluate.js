var app = getApp();
var qiniuUploader = require('../../utils/qiniuUploader.js');
// pages/evaluate/evaluate.js
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
  bindChoicePice: function (e) {
    var _this = this,
      index = e.currentTarget.dataset.index,
      images = _this.data.images;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var filePath = tempFilePaths[0];
        wx.showToast({
          icon: 'loading',
          title: '上传中',
          duration: 5000
        })
        _this.uploadToQiniu(filePath, '/reward/img/' + _this.getdate() + '/', index);
      }
    })
  },
  uploadToQiniu: function (filePath, prefix, index) {
    var that = this;
    var images = that.data.images;
    console.log(images)
    var index = index;
    qiniuUploader.upload(filePath, (res) => {
      var src = 'https://' + res.imageURL;

      images[index].src = src;
      images[index].cancel = true;
      if (index < 2) {
        images[index + 1].show = true;
      }

      that.setData({
        images: images
      });
      wx.hideToast();
    }, (error) => {
      console.log('error: ' + error);
    }, {
        uploadURL: 'https://upload-z2.qiniup.com ',
        domain: 'mpstatic.hanyu020.com ',
        uptokenURL: app.globalData.domain + '/Hotel/Qiniu/getUploadToken',
        region: 'SCN',
        prefix: prefix
      })
  },
  getdate: function () {
    var now = new Date()
    var y = now.getFullYear()
    var m = now.getMonth() + 1
    var d = now.getDay()
    m = m < 10 ? "0" + m : m
    d = d < 10 ? "0" + d : d
    return y + "-" + m + "-" + d
  },


})