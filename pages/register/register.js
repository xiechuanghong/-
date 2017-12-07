// pages/register/register.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    codeMsg:'发送验证码'
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
    this.data.codeValue = '';
    this.data.phone = '';
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
  bindPhone:function(){
    var that = this;
    // if(!/^1[34578]\d{9}$/.test(that.data.phone)){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入正确的手机号码',
    //   })
    //   return;
    // } else 
    if (that.data.codeValue == ''){
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
      })
      return;
    }
    wx.request({
      url: app.globalData.url + 'Member/validate',
      method:'POST',
      dataType:'JSON',
      data:{
        key: app.globalData.key,
        pro_id: config.pro_id,
        store: config.store,
        phone: that.phone,
        c_code: that.data.codeValue,
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        if(str.success == 1){
          wx.showModal({
            title: '提示',
            content: '绑定成功',
            success:(res)=>{
              wx.redirectTo({
                url: '../register02/register02?c_code=' + that.data.codeValue+'&phone='+that.phone + '&type='+1,
              })
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '验证码有误，请重新输入',
          })
        }
      }
    })
  },
  codeValue:function(ev){
    this.setData({
      codeValue:ev.detail.value
    })
  },
  sendCode: function(e) {
    var _this  = this,
        url    = app.globalData.url,
        key    = app.globalData.key,
        pro_id = config.pro_id,
        store  = config.store,
        phone  = _this.data.phone;
        if(_this.data.codeMsg == '已发送'){return;}
        if (phone === '' || !/^1[34578]\d{9}$/.test(phone) || phone == undefined) {
          wx.showModal({
            title: '',
            content: '请输入正确的手机号',
          });
        } else {
          wx.request({
            url: url + 'Member/sendCode',
            dataType: 'json',
            data: {
              key: key,
              pro_id: pro_id,
              store: store,
              phone: phone
            },
            method: 'POST',
            success: function(res) {
              if (res.data.success === 1) {
                wx.showToast({
                  title: '获取成功',
                  icon: 'success',
                  duration: 1500
                });
                _this.setData({
                  codeMsg:'已发送'
                })
                _this.phone = phone;
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
  changePhone: function(e) {
    var _this = this,
        phone = e.detail.value; 
    if(phone != _this.phone){
      _this.setData({
        codeMsg: '发送验证码'
      })
    }
    _this.setData({
      phone: phone
    });
  },
  getPhone:function(ev){
    console.log(ev)
    var that = this;
    wx.request({
      url: app.globalData.url + 'Member/dencryptData',
      method: 'POST',
      dataType: 'JSON',
      data:{
        pro_id: config.pro_id,
        store: config.store,
        key: app.globalData.key,
        iv: ev.detail.iv,
        encryptedData: ev.detail.encryptedData
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str)
        if(str.success == 1){
          var response = JSON.parse(str.responseData);
          var phone = response.phoneNumber;
          console.log(response);
          if(phone != ''){
            wx.redirectTo({
              url: '../register02/register02?c_code=' + '' + '&phone=' + phone + '&type='+2,
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '您的微信还未绑定手机号哦',
            })
          }
        }
      }
    })
  }
})