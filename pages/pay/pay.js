// pages/pay/pay.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selPay:'icon-selected-true',
    noSelPay:'icon-selected-false',
    selId:3,
    //--------------
    couponID: '',
    totalPrice: '0.00',
    couponAmout: '0.00',
    payPrice: '0.00',
    //--------------
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isMember();
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
    console.log(this.data)
    if (this.inputNumber){
      this.payVal();
    }
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
  wxPay:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Order/payTheBill',
      method:'POST',
      dataType:'JSON',
      data:{
        pro_id: config.pro_id,
        store: config.store,
        key: app.globalData.key,
        order_amount: that.data.totalPrice,
        pay_amount: that.data.payPrice,
        ticket: that.data.couponID,
        formId: that.formId
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        if(str.success == 1){
          var dat = str.responseData.pay_data,
              order_id = str.responseData.order_id.order_id;
          wx.requestPayment({
            timeStamp: dat.time,
            nonceStr: dat.nonce_str,
            package: dat.package,
            signType: 'MD5',
            paySign: dat.paySign,
            success:(res)=>{
              wx.showModal({
                title: '提示',
                content: '支付成功',
                success:()=>{}
              })
            },
            fail:()=>{
              wx.showModal({
                title: '提示',
                content: '支付失败',
              })
            },
            complete: () => {
              that.setData({
                couponID: '',
                totalPrice: '0.00',
                payPrice: '0.00',
                couponAmout: '0.00'
              })
            }
          })
        }
      }
    })
  },
  balancePay:function(){
    var that = this;
    console.log(app.globalData)
    console.log(app.globalData.key)
    wx.request({
      url: app.globalData.url + 'Payment/payTheBillBalancePaid',
      method:'POST',
      dataType:'JSON',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key,
        order_amount: that.data.totalPrice,
        pay_amount: that.data.payPrice,
        ticket: that.data.couponID,
        formId: that.formId
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str)
        if(str.success == 1){
          wx.showModal({
            title: '提示',
            content: '支付成功',
            success:()=>{}
          })
        }else{
          wx.showModal({
            title: '提示',
            content: str.message,
            success:()=>{}
          })
        }
      },
      complete:()=>{
        that.setData({
          couponID: '',
          totalPrice: '0.00',
          payPrice: '0.00',
          couponAmout: '0.00'
        })
      }
    })
  },
  inputVal:function(ev){
    // console.log(ev)
    var val = ev.detail.value.toString();
    val = val.replace(/\s/g,'');
    val = Number(val);
    console.log(val)
    if(isNaN(val)){
      wx.showModal({
        title: '提示',
        content: '消费金额必须是数字',
      })
      return;
    }
    this.inputNumber = val.toFixed(2);
    this.setData({
      totalPrice: val.toFixed(2),
      couponID: '',
      couponAmout: '0.00'
    })
    this.payVal();
  },
  payVal:function(){
      if (this.data.isMember == 1) {
        var payPrice = (this.inputNumber - this.data.couponAmout) * this.data.mcard_deduct;
      }else{
        var payPrice = this.inputNumber - this.data.couponAmout;
      }
      payPrice = payPrice <= 0 ? 0 : payPrice;
      if (payPrice == 0){
        this.setData({
          payPrice: '0.00',
          couponID: '',
          totalPrice: '0.00',
          couponAmout: '0.00',
        })
        return;
      }
      this.setData({
        payPrice: payPrice.toFixed(2)
      })
    
  },
  seslBalance:function(){
    this.setData({
      selId: 1
    })
  },
  selWx: function () {
    this.setData({
      selId: 3
    })
  },
  selPay:function(ev){
    // console.log(ev)
    this.formId = ev.detail.formId;
    if(this.data.selId == 1){
      this.balancePay();
    }else{
      this.wxPay();
    }
  },
  useCoupon:function(){
    wx.navigateTo({
      url: '../useCoupon/useCoupon?couponID=' + this.data.couponID + '&totalPrice=' + this.data.totalPrice,
    })
  },
  isMember:function(){
    var member = app.globalData.gradeInfo;
    this.setData({
      isMember: member.is_member,
      mcard_deduct: member.mcard_deduct / 100
    })
  }

})