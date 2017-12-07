// pages/bookInfo/bookInfo.js
var app = getApp();
var config = require('../../utils/config.js');
var Count = require('../../utils/count.js');
const count = new Count();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id    : -1,
    avatar     : '',
    name       : '',
    sum        : '',
    title      : '',
    goods      : [],
    selectGoods: {},
    selectNums : '1',
    goodsPrice : '0.00',
    //--------------
    couponID   : '',
    totalPrice : '0.00',
    couponAmout: '0.00',
    payPrice   : '0.00',
    //--------------
    date       : '',
    time       : '',
    dateStart  : '',
    timeStart  : '',

    hasfun       : false,
    deduct       : '0',
    integration  : '0',
    isIntegral   : false,
    activity     : [],
    activityPrice: '0.00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
        user_id = options.user_id,
        now = new Date(),
        date = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
        time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()),
        activity = app.globalData.activity,
        hasfun = false,
        deduct = parseInt(app.globalData.gradeInfo.jf_toamount_deduct),
        integration = parseInt(app.globalData.gradeInfo.integration),
        isIntegral = false;

    isIntegral = (deduct > integration) ? false : true;

    if (!!(activity.length)) {
      hasfun = true;
      _this.sortActivity();
    }
    _this.setData({
      date       : date,
      time       : time,
      user_id    : user_id,
      dateStart  : date,
      timeStart  : time,
      hasfun     : hasfun,
      deduct     : deduct,
      integration: integration,
      isIntegral : isIntegral
    });
    _this.bespeakExpertInfo();
    _this.sortActivity();
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
  bespeakExpertInfo: function() {
    var _this = this,
        url   = app.globalData.url,
        data  = {
          key    : app.globalData.key,
          pro_id : config.pro_id,
          store  : config.store,
          user_id: _this.data.user_id
        };
    wx.request({
      url: url + 'Cosmetology/bespeakExpertInfo',
      data: data,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            avatar: res.data.responseData.avatar,
            name  : res.data.responseData.name,
            sum   : res.data.responseData.sum,
            title : res.data.responseData.title,
            goods : res.data.responseData.goods
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
  bespeakAdd: function() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    });
  },
  toUseCoupon: function() {
    wx.navigateTo({
      url: '../useCoupon/useCoupon',
    });
  },
  selectGoods: function(e) {
    var _this       = this,
        selectGoods = _this.data.selectGoods,
        goods_id    = e.currentTarget.dataset.goods_id,
        goods_price = e.currentTarget.dataset.goods_price,
        goodsPrice  = _this.data.goodsPrice,
        totalPrice  = _this.data.totalPrice,
        selectNums  = _this.data.selectNums;

    goodsPrice = selectGoods[goods_id] ? count.reduce(goodsPrice, goods_price) : count.add(goodsPrice, goods_price);
    selectGoods[goods_id] = selectGoods[goods_id] ? false : true;
    totalPrice = count.multiply(selectNums, goodsPrice);

    _this.setData({
      selectGoods: selectGoods,
      goodsPrice : goodsPrice,
      totalPrice : totalPrice
    });
    _this.fullReduce();
  },
  selectNums: function(e) {
    var _this      = this,
        selectNums = e.currentTarget.dataset.nums,
        totalPrice = _this.data.totalPrice,
        goodsPrice = _this.data.goodsPrice;

    _this.setData({
      selectNums: selectNums,
      totalPrice: count.multiply(selectNums, goodsPrice),
    });
    _this.fullReduce();
  },
  bindDateChange: function(e) {

  },
  bindTimeChange: function(e) {

  },
  sortActivity: function () {
    var activity = app.globalData.activity,
        arr      = [];
    for (var item of activity) {
      arr.push(item.amount[0]);
    }
    arr.sort(function(item1, item2) {
      return item1.full_amount - item2.full_amount;
    });
    this.setData({
      activity: arr
    });
  },
  //计算满减
  fullReduce: function() {
    var _this         = this,
        activity      = _this.data.activity,
        totalPrice    = _this.data.totalPrice,
        activityPrice = _this.data.activityPrice;
    for (var item of activity) {
      if ((totalPrice - item.full_amount) > 0) {
        activityPrice = item.minus_amount;
        break;
      } else {
        activityPrice = '0.00';
      }
    }
    _this.setData({
      activityPrice: activityPrice
    });
  }
})