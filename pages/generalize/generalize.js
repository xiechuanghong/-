// pages/generalize/generalize.js
var app = getApp();
var config = require('../../utils/config.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upper: '',
    isRead: true,
    name: '',
    phone: '',
    isSalesman: false,
    pre_key: 0,
    Parse:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this,
        pre_key = options.pre_key,
        salesman = parseInt(options.salesman),
        upper = options.upper;
    console.log('---------------------------------')
    console.log(pre_key, salesman, upper);
    console.log('---------------------------------')
    if (pre_key) {
      _this.setData({
        pre_key: pre_key
      });
    }
    if (upper) {
      _this.setData({
        upper: upper,
      });
    } else {
      _this.setData({
        upper: app.globalData.shop.shop_name,
      });
    } 
    if (salesman == 0){
      _this.setData({
        isSalesman: false
      });
    } else {
      _this.setData({
        isSalesman: true
      });
    }

    console.log(app.globalData.txt)
    var txt=app.globalData.txt;
    // var article = txt.protocol_title;
    // var content = txt.protocol_content;
    //   WxParse.wxParse('article', 'html', content, _this, 10);
    //   _this.setData({
    //     isLoading: false
    //   });

  },
  Parse:function(ev){
    if (ev.target.id =='Parse'){
      this.setData({
        Parse: !this.data.Parse
      })
    }
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
  tapRead: function(e) {
    var _this = this,
        isRead = _this.data.isRead;
    _this.setData({
      isRead: !isRead
    });
  },
  inputName: function(e) {
    var _this = this,
        name = e.detail.value;
    _this.setData({
      name: name,
    });
  },
  inputPhone: function(e) {
    var _this = this,
        phone = e.detail.value;
    _this.setData({
      phone: phone,
    });
  },
  tapConfirm: function(e) {
    var _this = this,
        name = _this.data.name,
        phone = _this.data.phone,
        isRead = _this.data.isRead,
        isSalesman = _this.data.isSalesman,
        pre_key = _this.data.pre_key;
    if (name === '') {
      wx.showModal({
        title: '',
        content: '请输入真实姓名',
      });
    } else if (phone === '' && !(/^1[34578]{1}\d{9}$/.test(phone))) {
      wx.showModal({
        title: '',
        content: '请输入正确手机号码',
      });
    } else if (!isRead) {
      wx.showModal({
        title: '',
        content: '请阅读推广协议',
      });
    } else {
      wx.request({
        url: app.globalData.url + 'Salesman/userApplyAdd',
        data: {
          realname: name,
          phone: phone,
          key: app.globalData.key,
          pro_id: config.pro_id,
          store: config.store,
          pre_key: pre_key
        },
        dataType: 'json',
        method: 'POST',
        success: function(res) {
          if (res.data.success === 1) {
            wx.showToast({
              title: '申请成功',
              icon: 'success',
              duration: 1000
            })
            var current = getCurrentPages();
            var prePage = current[current.length - 2];
            prePage.setData({
              is_salesman: 1
            })
            _this.setData({
              isSalesman: true
            })
          } else {
            wx.showModal({
              title: '',
              content: res.data.message,
            })
          }
        }
      })
    }
  },
  to_home:function(){
    wx.switchTab({
      url: '../index/index',
    })
  }
})