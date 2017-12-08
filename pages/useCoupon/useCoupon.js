// pages/useCoupon/useCoupon.js
var app = getApp();
var config = require('../../utils/config.js');
var Count = require('../../utils/count.js');
const count = new Count();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: [1],
    couponID:'',
    noSel:'icon-selected-false',
    sel:'icon-selected-true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getList();
    this.setData({
      couponID: options.couponID,
      totalPrice: parseFloat(options.totalPrice)
    });
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
  getList:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Activity/getAllCoupons',
      method:'GET',
      dataType:'JSON',
      data:{
        pro_id: config.pro_id,
        store: config.store,
        key: app.globalData.key,
        shop_id: app.globalData.shop.shop_id
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        if(str.success == 1){
          var lis = str.responseData;
          lis = JSON.stringify(lis) == '{}'?[]:lis;
          that.setData({
            list:lis
          })
        }
      }
    })
  },
  selCoupon:function(ev){
    var ID = ev.target.dataset.id;
    if (ID == this.data.couponID){
      this.setData({
        couponID:''
      })
    }else{
      this.setData({
        couponID:ID
      })
    }
  },
  confirmUse:function(){
    var that = this;
    var lis = that.data.list,
        couponID = that.data.couponID;
        if(couponID == ''){
          console.log('空')
          var current = getCurrentPages(),
            payPrice = parseFloat(that.data.totalPrice);
          var prePage = current[current.length - 2];
          prePage.setData({
            couponAmout: 0.00,
            payPrice: payPrice,
            couponID: ''
          })
          wx.navigateBack();
        }
    try{   
      lis.forEach(function(v){
        if (v.activity_id == couponID){
          if (that.data.totalPrice >= v.condition_amount){
            var current = getCurrentPages(),
                payPrice = count.reduce(that.data.totalPrice, v.amount);
            var prePage = current[current.length - 2];
            prePage.setData({
              couponAmout: v.amount,
              payPrice: payPrice,
              couponID: v.activity_id
            });
            // prePage.member();
            throw true
          }else{
            wx.showModal({
              title: '提示',
              content: '不符合优惠券使用要求',
            })
            throw false
          }
        }
      })
    }catch(e){
      console.log(e)
      if(e){
        wx.navigateBack();
      }
    } 
  }

})