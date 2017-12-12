var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderReal: [],
    orderMake: [],
    status:'',
    isPay:false,
    currentTab: "0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.orderRequest('G');
    this.orderRequest('P');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.orderList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      shop_name: app.globalData.shop.shop_name
    })
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
  onShareAppMeRealage: function () {
  
  },
  toOrderDetail: function(e) {
    var order_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+order_id,
    })
  },
  toEvaluate: function() {
    wx.navigateTo({
      url: '../evaluate/evaluate?id='+order_id,
    })
  },
  orderList:function(){
    console.log(222222222)
    var _this = this;
    if (!app.globalData.key) {
      setTimeout(function () {
        _this.orderList();
      },200)
      return;
    }
    this.orderRequest('P');
    this.orderRequest('G');
  },
  confirmConsume:function(ev){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Cosmetology/consumeOk',
      method:'GET',
      dataType:'POST',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key,
        order_id:ev.target.dataset.id
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        if(str.success == 1){
          console.log(111111111)
          wx.showToast({
            title: '',
            icon:'success',
            duration:1000,
          })
          that.orderList();
        }
      }
    })
  },
  //微信支付
  payWeixin: function() {
    var _this = this,
        url   = app.globalData.url,
        data  = {
          key     : app.globalData.key,
          store   : config.store,
          pro_id  : config.pro_id,
          order_id: _this.data.orderID,
        };
    _this.setData({
      selectPayType: '1'
    });
    wx.request({
      url: url + 'Order/orderPayment',
      data: data,
      dataType: 'json',
      method: 'POST',
      success: (res) => {
        if (res.data.success === 1) {
          _this.setData({
            isPay: false
          });
          var _order_id = res.data.responseData.order_id.order_id;
          wx.requestPayment({
            timeStamp: res.data.responseData.pay_data.time,
            nonceStr: res.data.responseData.pay_data.nonce_str,
            package: res.data.responseData.pay_data.package,
            signType: 'MD5',
            paySign: res.data.responseData.pay_data.paySign,
            success: (res) => {
              wx.showToast({
                title   : '支付成功',
                icon    : 'success',
                duration: 2000,
                complete: () => {
                  wx.navigateTo({
                    url: '../orderDetail/orderDetail?id=' + _order_id,
                  })
                }
              });
            },
            fail: (res) => {
              wx.showModal({
                title: '',
                content: '支付失败',
                success: (res) => {
                  wx.navigateTo({
                    url: '../orderDetail/orderDetail?id=' + _order_id,
                  })
                }
              })
            },
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
  payYue: function() {
    var _this = this,
        url   = app.globalData.url,
        data  = {
          key: app.globalData.key,
          store: config.store,
          pro_id: config.pro_id,
          order_id: _this.data.orderID,
        };
    _this.setData({
      selectPayType: '2'
    });
    wx.request({
      url: url + 'Payment/orderPaymentBalancePaid',
      data: data,
      dataType: 'json',
      method: 'POST',
      success: (res) => {
        if (res.data.success === 1) {
          _this.setData({
            isPay: false
          });
          var _order_id = res.data.responseData.order_id;
          wx.showToast({
            title: '支付成功',
            icon : 'success',
            duration: 2000,
            complete: () => {
              wx.navigateTo({
                url: '../orderDetail/orderDetail?id=' + _order_id,
              })
            }
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    });
  },
  cancelOrder: function(e) {
    var _this = this,
        url = app.globalData.url,
        order_id = e.currentTarget.dataset.id,
        data = {
          pro_id  : config.pro_id,
          store   : config.store,
          key     : app.globalData.key,
          order_id: order_id    
        };
    wx.request({
      url: url + 'Order/cancelNoPayOrder',
      data: data,
      dataType: 'json',
      method: 'POST',
      success: (res) => {
        if (res.data.success === 1) {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000
          });
          _this.orderList();
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    })
  },
  toEvaluate: function(e) {
    var _this = this,
        id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../evaluate/evaluate?id=' + id,
    })
  },
  openModal:function(ev){

    this.setData({
      isPay: !this.data.isPay,
      orderID: ev.target.dataset.id
    })
  },
  closeModal:function(){
    this.setData({
      isPay:false
    })
  },
  cancelOrder:function(ev){
    var that = this;
    wx.request({
      url: app.globalData.url +'Order/cancelNoPayOrder',
      method:'POST',
      dataType:'JSON',
      data:{
        pro_id:config.pro_id,
        store:config.store,
        key:app.globalData.key,
        order_id:ev.target.dataset.id
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        if(str.success==1){
          wx.showModal({
            title: '提示',
            content: '取消订单成功',
            success:()=>{
              that.orderList();
            }
          })
        }
      }
    })
  },
  // 点击tab时切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 发送请求获取数据
  orderRequest:function(type) {
    var _this = this,
      pro_id = config.pro_id,
      store = config.store,
      key = app.globalData.key,
      url = app.globalData.url;
    console.log('key:' + key)
    wx.request({
      url: url + 'Cosmetology/bespeakPay',
      data: {
        pro_id: pro_id,
        store: store,
        key: key,
        order_type: type
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        let arr = []
        if (res.data.success == 1) {
          if (!(res.data.responseData.length === undefined)) {
            if (type == 'G') {
              _this.setData({
                orderReal: res.data.responseData,
              })
            } else {
              _this.setData({
                orderMake: res.data.responseData,
              })
            }
          }
        } else {
          wx.showModal({
            title: '',
            content: '当前没有订单',
          })
        }
      }
    })
  }
})