// pages/applyFor/applyFor.js
const app=getApp();
const config=require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tax:0.00,
    money:0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  next:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认提现到微信钱包吗？',
      success:(res)=>{
        console.log(res);
        if (res.confirm){
          that.confirmApply();
        }
      }
    })
  },
  confirmApply:function(){
    var that=this;
    // console.log(that.data.value);
    if (that.data.value == 0 || that.data.value == '' || that.data.value==undefined){
      wx.showModal({
        title: '提示',
        content: '请输入提现金额',
        success:(res)=>{}
      })
      return;
    }
    wx.request({
      url: app.globalData.url +'Salesman/withdrawals',
      method:'POST',
      dataType:'JSON',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key,
        amount:that.data.value,
        money_to_type:3
      },
      success:(res)=>{
        var str=JSON.parse(res.data);
        console.log(str)
        if(str.success==1){
          wx.showModal({
            title: '提示',
            content: '申请成功！',
            success:(res)=>{
              wx.redirectTo({
                url: '../cashDetail/cashDetail',
              })
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: str.message,
          })
        }
      }
    })
  },
  inputVal:function(ev){
    if (ev.detail.value == '' || (Number(ev.detail.value) == 0) || isNaN(Number(ev.detail.value)) ){
      this.setData({
        tax: 0.00,
        money: 0.00,
        value: 0.00
      })
      return;
    }
    this.setData({
      tax: (parseFloat(ev.detail.value) * parseFloat(this.deduct)).toFixed(2),
      money: (parseFloat(ev.detail.value) * (1-parseFloat(this.deduct))).toFixed(2),
      value: (parseFloat(ev.detail.value)).toFixed(2)
    })
  },
  all:function(){
    this.setData({
      value: this.data.list.amount,
      tax: (parseFloat(this.data.list.amount) * parseFloat(this.deduct)).toFixed(2),
      money: (parseFloat(this.data.list.amount) * (1 - parseFloat(this.deduct))).toFixed(2)
    })
  },
  getData:function(){
    var that=this;
    wx.request({
      url: app.globalData.url +'Salesman/getAmount',
      method:'GET',
      dataType:'JSON',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key
      },
      success:(res)=>{
        var str=JSON.parse(res.data);
        console.log(str)
        that.deduct = parseFloat(str.responseData.deduct)/100 ;
        that.setData({
          list:str.responseData,
          deduct: str.responseData.deduct
        })
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
    wx.showNavigationBarLoading();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
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