// pages/bookSet/bookSet.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    technician:'',
    dateVal:'',
    timeVal:'',
    start:new Date(),
    startTime:new Date().getHours() + ':' + new Date().getMinutes(),
    manNumber:'',
    manArry:[],
    activityID:'',
    reduceAmout:'0.00',
    //--------------
    couponID: '',
    totalPrice: '0.00',
    couponAmout: '0.00',
    payPrice: '0.00',
    //--------------
    selPay: 'display:none',
    choice: '../img/myaddress_icon_selected.png',
    nochoice: '../img/choice_icon_notselected.png'
  },
  manArry:function(){
    var i = 1,
        arr = [];
    while(i<=10){
      arr.push(i);
      i++;
    }
    this.setData({
      manArry:arr
    })
  },
  PAY: function (ev) {
    this.payId = ev;
    if (!this.contacts || this.contacts == ''){
      wx.showModal({
        title: '提示',
        content: '请输入您的姓名',
      })
      return;
    } else if(!this.phone || this.phone == ''){
      wx.showModal({
        title: '提示',
        content: '请输入您的手机号码',
      })
      return;
    } else if (!this.data.technicianID || this.data.technicianID == '') {
      wx.showModal({
        title: '提示',
        content: '请选择技师',
      })
      return;
    } else if (!this.data.dateVal || this.data.dateVal == '' || !this.data.timeVal || this.data.timeVal == '') {
      wx.showModal({
        title: '提示',
        content: '请选择美容时间',
      })
      return;
    } else if (!this.data.manNumber || this.data.manNumber == '' ) {
      wx.showModal({
        title: '提示',
        content: '请选择预约人数',
      })
      return;
    }
    var dat = {
      pro_id: config.pro_id,
      store: config.store,
      key: app.globalData.key,
      phone: this.phone,
      bespeak_type: 2,
      select_id: this.data.list.goods_id,
      pay_amount: this.data.payPrice,
      order_amount: this.data.totalPrice,
      date: this.data.dateVal,
      time: this.data.timeVal,
      ref_id: this.data.technicianID,
      contacts: this.contacts,
      pnum: this.data.manNumber,
      note:'',
      ticket: this.data.couponID,
      activity_id: this.data.activityID,
      formId: this.formId,
      is_used_jf:0
    }
    this.dat = dat;
    this.setData({
      selPay: ''
    })
  },
  selPay: function (ev) {
    // console.log(ev)
    console.log(this.dat)
    if (ev.target.dataset.paytype == 3) {
      console.log('微信支付')
      this.wxPay();
      this.setData({
        selId: 3
      })
    } else if (ev.target.dataset.paytype == 1) {
      console.log('余额支付')
      this.balance();
      this.setData({
        selId: 1
      })
    } else {
      this.setData({
        selPay: 'display:none'
      })

    }
  },
  wxPay:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Reserve/bespeakAdd',
      method:'POST',
      dataType:'JSON',
      data:that.dat,
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str);
        if(str.success == 1){
          app.globalData.evaluate = true;
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
                success:()=>{
                  wx.redirectTo({
                    url: '../orderDetail/orderDetail?id=' + order_id,
                  })
                }
              })
            },
            complete:()=>{
              app.globalData.evaluate = true;
            }
          })
        }
      }
    })
  },
  balance:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Payment/bespeakBalancePaid',
      method:'POST',
      dataType:'JSON',
      data:that.dat,
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str);
        if(str.success == 1){
          wx.showModal({
            title: '提示',
            content: '支付成功',
            success:()=>{
              this.setData({
                selPay: 'display:none'
              })
              wx.redirectTo({
                url: '../orderDetail/orderDetail?id='+str.responseData.order_id,
              })
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: str.message,
            success:()=>{
              this.setData({
                selPay: 'display:none'
              })
            }
          })
        }
      },
      complete:()=>{
        app.globalData.evaluate = true;
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // console.log(app.globalData.gradeInfo);
    // console.log(app.globalData.activity);
    // console.log(this.data.startTime)
    
    var list = decodeURIComponent(options.list);
    list = JSON.parse(list);
    var now = new Date(),
        date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()),
        time = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
    this.setData({
      list:list,
      totalPrice: list.goods_price,
      payPrice: list.goods_price,
      dateVal: date,
      timeVal: time
    })

    this.manArry();
    this.judgeMember();
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
    // if(this.data.couponID == ''){
      this.payTotal();
    // }
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
  toUseCoupon: function() {
    wx.navigateTo({
      url: '../useCoupon/useCoupon?couponID=' + this.data.couponID + '&totalPrice=' + this.data.totalPrice,
    })
  },
  toTechnician: function() {
    wx.navigateTo({
      url: '../technician/technician',
    })
  },
  dateValue:function(ev){
    var val = ev.detail.value;
    console.log(ev)
    this.setData({
      dateVal:val
    })
  },
  timeValue:function(ev){
    var val = ev.detail.value;
    console.log(val)
    this.setData({
      timeVal:val
    })
  },
  selManNumber:function(ev){
    var val = parseFloat(ev.detail.value);
    this.setData({
      manNumber:val + 1,
      totalPrice: (val + 1) * this.data.list.goods_price
    })
    this.payTotal();
  },
  judgeMember:function(){
    var member = app.globalData.gradeInfo;
    var activity = app.globalData.activity;
    var integral = member.integration / member.jf_toamount_deduct;
    activity.sort(function(a,b){
      return a.amount[0].full_amount - b.amount[0].full_amount;
    });
    this.setData({
      activity:activity,
      integral:integral,
      isMember: member.is_member,
      mcard_deduct: member.mcard_deduct / 100
    })
  },
  payTotal:function(){
    var that = this;
    var totalPrice = that.data.totalPrice,
      isMember = that.data.isMember,
      integral = that.data.integral,
      mcard_deduct = that.data.mcard_deduct,
      payPrice = that.data.payPrice,
      couponID = that.data.couponID,
      actReduce =0,
      activityID = '';
    if (couponID == ''){
      var activity = that.data.activity;
      activity.forEach(function (v) {
        if (parseFloat(v.amount[0].full_amount) <= parseFloat(totalPrice)) {
          activityID = v.amount[0].activity_id;
          actReduce = v.amount[0].minus_amount;
          console.log(payPrice)
        }
      })
    }else{
      actReduce = that.data.couponAmout;
    }
    if (isMember == 1){
      payPrice = totalPrice - integral - actReduce;
      if (that.data.list.is_discount == 1){
        payPrice = payPrice - (totalPrice * (1 - mcard_deduct));
      }
    }else{
      payPrice = totalPrice - actReduce;
    }
    payPrice = payPrice <= 0 ? 0 : payPrice;
    integral = payPrice <= 0 ? payPrice : integral;
    that.setData({
      payPrice: parseFloat(payPrice).toFixed(2),
      reduceAmout: (totalPrice - payPrice).toFixed(2),
      activityID: activityID,
      reduce: actReduce,
      integral: integral
    })
  },
  confirmSubmit:function(ev){
    console.log(ev)
    this.formId = ev.detail.formId;
  },
  nameValue:function(ev){
    this.contacts = ev.detail.value;
  },
  phoneValue:function(ev){
    var ph = /^1[3|4|5|7|8]\d{9}$/;
    if(!ph.test(ev.detail.value)){
      wx.showModal({
        title: '提示',
        content: '手机号码格式不正确',
      })
      return;
    }
    this.phone = ev.detail.value;
  }
})