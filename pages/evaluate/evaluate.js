var app = getApp();
var config = require('../../utils/config.js');
var qiniuUploader = require('../../utils/qiniuUploader.js');
// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
      { src: '../img/comment_icon_add.png', cancel: false},
      { src: '../img/comment_icon_add.png', cancel: false},
      { src: '../img/comment_icon_add.png', cancel: false},
    ],
    stars: [true, false, false, false, false],
    grade:'1',
    anonymous:true
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
      console.log(res.imageURL)
      images[index].src = src;
      images[index].cancel = true;
      // if (index < 2) {
      //   images[index + 1].show = true;
      // }

      that.setData({
        images: images
      });
      wx.hideToast();
      
    }, (error) => {
      console.log('error: ' + error);
    }, {
        uploadURL: 'https://upload-z2.qiniup.com',
        domain: 'mpstatic.hanyu020.com',
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
  // 删除评价图片
  delImg:function(e) {
    var _this = this,
      index   = e.currentTarget.dataset.index,
      images  = _this.data.images;
    wx.showModal({
      title: '提示',
      content: '是否删除图片',
      success: function(res){
        if(res.confirm) {
          images[index].cancel = false
          images[index].src = '../img/comment_icon_add.png'
          _this.setData({
            images: images
          })
        }
      }
    })
  },
  // 评价星星
  rating: function (e) {
    var starRating = e.currentTarget.dataset.id
    var arrStars = this.data.stars;
    for (var j = 0; j < arrStars.length; j++) {
      arrStars[j] = false
    }
    for (var i = 0; i < starRating; i++) {
      arrStars[i] = true
    }
    this.setData({
      stars: arrStars,
      grade: starRating
    })
  },
  // 获取textarea文本
  bindTextAreaBlur:function(e) {
    let textArea = e.detail.value
    this.setData({
      textArea: textArea
    })
  },
  // 是否匿名评价
  isAnonymous:function(){
    this.setData({
      anonymous: !this.data.anonymous,
    })
  },
  // 提交到服务器
  formSubmit: function () {
    let arrImg = []
    for (var i = 0; i < this.data.images.length ; i++){
      arrImg.push(this.data.images[i].src)
    }
    var _this   = this,
      url       = app.globalData.url,
      pro_id    = config.pro_id,
      store     = config.store,
      key       = app.globalData.key,
      order_id  = order_id,  //
      content   = this.data.textArea,
      star      = this.data.grade,
      anonymous = this.data.anonymous?'1':'0',
      images    = arrImg.join(','),
      shop_id   = shop_id, // 
      goods_id  = goods_id; // 
    wx.request({
      url: url + 'Store / commentStore',
      data: {
        pro_id: pro_id,
        store: store,
        key: key,
        order_id: order_id,
        content: content
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })
  },
})