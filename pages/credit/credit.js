// pages/credit/credit.js
var app = getApp();
var config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actBtnStyle: 'border-color:#FCA135;color:#FCA135'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      wallet: options.wallet
    });
    app.globalData.credit = false;
  },
  money:function(ev){
    this.setData({
      inputVal:ev.detail.value
    })
  },
  activity:function(ev){
    // console.log(ev);
    this.setData({
      inputVal:ev.target.dataset.num,
      actId:ev.target.dataset.num
    })
  },
  refill:function(ev){
    var that = this;
    var num = Number(that.data.inputVal);
    console.log(num)
    // console.log(isNaN(num))
    if(isNaN(num)){
      wx.showModal({
        title: '提示',
        content: '金额必须是数字',
      })
      return;
    }else if(num == 0){
      wx.showModal({
        title: '提示',
        content: '请输入充值金额',
      })
      return;
    }
    // num = parseFloat(num);

    wx.request({
      url: app.globalData.url +'Recharge/recharge',
      method:'POST',
      dataType:'JSON',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key,
        amount: num
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str)
        if(str.success == 1){
          var dat = str.responseData.pay_data;
          wx.requestPayment({
            timeStamp: dat.time,
            nonceStr: dat.nonce_str,
            package: dat.package,
            signType: 'MD5',
            paySign: dat.paySign,
            success:(res)=>{
              wx.showModal({
                title: '提示',
                content: '充值成功',
                success:(res)=>{
                  wx.navigateBack({
                    data: 1
                  })
                }
              });
              this.setData({
                inputVal: ''
              })
              app.globalData.credit = true;
            },
            fail:(res)=>{
              wx.showModal({
                title: '提示',
                content: '充值失败',
              })
            },
            complete:(res)=>{

            }
          })
        }
      }
    })
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
    this.setData({
      inputVal: ''
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
  
  }
})