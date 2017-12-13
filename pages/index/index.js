// index/index.js
var app    = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ad              : [],
    expert          : [],
    storeRecommended: [],
    shop: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      shop: app.globalData.shop
    })
    _this.index();
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
    this.title();
  },
  title:function(){
    var that = this;
    if (!app.globalData.shop){
      setTimeout(function(){
        that.title();
      },200)
      return;
    }
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
    this.index();
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
  index: function() {
    var _this = this,
        pro_id = config.pro_id,
        store  = config.store,
        url    = app.globalData.url;
    wx.request({
      url: url + 'Index/index',
      data: {
        pro_id: pro_id,
        store: store
      },
      dataType: 'json',
      method: "GET",
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            ad              : res.data.responseData.ad,
            expert          : res.data.responseData.expert,
            storeRecommended: res.data.responseData.storeRecommended
          });
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    })
  },
  toSet: function() {
    wx.navigateTo({
      url: '../set/set',
    })
  },
  toBookInof: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../bookInfo/bookInfo?id=' + id,
    })
  },
  toPay: function() {
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  toGetCoupon: function() {
    wx.navigateTo({
      url: '../getCoupon/getCoupon',
    })
  },
  toBookSet: function() {
    wx.navigateTo({
      url: '../bookSet/bookSet',
    })
  },
  toSetDetail: function(ev) {
    wx.navigateTo({
      url: '../setDetail/setDetail?goods_id=' + ev.target.dataset.goods_id,
    })
  },
  toAbout:function() {
    wx.navigateTo({
      url: '../about/about',
    });
  },
  toEmployee:function() {
    wx.navigateTo({
      url: '../employee/employee',
    });
  },
  //包厢
  toRoom:function() {
    wx.navigateTo({
      url: '../room/room',
    });
  },
  //推广
  toExtend: function () {
    var _this = this,
      is_salesman = app.globalData.gradeInfo.is_salesman;
    if (is_salesman === 0 || is_salesman === 3) {
      wx.navigateTo({
        url: '../generalize/generalize?salesman=' + is_salesman,
      });
    } else if (is_salesman === 1) {
      wx.navigateTo({
        url: '../generalize/generalize?salesman=' + is_salesman,
      });
    } else {
      wx.navigateTo({
        url: '../center/center',
      });
    }

  },
  getCode:function(){
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        var url = res.path;
            url = url.substring(6);
            console.log(url)
        wx.navigateTo({
          url:'../'+url,
        })
      }
    })
  },
  gLocation: function () {
    // this.openMap(this.la, this.lo);
    var locations = this.data.shop.gps, la, lo;
    locations = locations.split(',');
    la = parseFloat(locations[0]);
    lo = parseFloat(locations[1]);
    // console.log(locations)
    // console.log(la)
    // console.log(lo)
    this.openMap(lo, la);
  },
  callPhone: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.shop.phone
    })
  },
  openMap: function (la, lo) {
    var that = this;
    wx.openLocation({
      latitude: la,
      longitude: lo,
      scale: 18,
      success: (res) => {
        console.log(res)
      }
    })
  },
})