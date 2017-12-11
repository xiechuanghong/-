// pages/goodsList/goodsList.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cRowClick:'border-left:5rpx solid #000; background:#fff;',
    cRowClickIndex:'0',
    cartShow:false,
    cart:{},
    cartLenth:0,
    total:0,
    selPay: 'display:none',
    choice: '../img/myaddress_icon_selected.png',
    nochoice: '../img/choice_icon_notselected.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  PAY: function (ev) {
    this.payId = ev;
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
  cRowClick:function(ev){
    if(!ev.target.id) return;
    this.setData({
      cRowClickIndex:ev.target.dataset.index
    })
  },
  showCart:function(ev){
    this.setData({
      showCart:!this.data.showCart
    })
  },
  hideCart:function(ev){
    if(ev.target.dataset.id == 'hide')
    this.setData({
      showCart:false
    })
  },
  getList:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Goods/getInStoreGoods',
      method:'GET',
      dataType:'JSON',
      data:{
        pro_id: config.pro_id,
        store: config.store
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str)
        if(str.success == 1){
          var lis = str.responseData;
          lis = JSON.stringify(lis) == '{}' ? [] : lis ;
          that.setData({
            list:lis
          })
        }
      }
    })
  },
  addCart:function(ev){
    var that = this;
    var cart = that.data.cart,
        len = that.data.cartLenth,
        total = parseFloat(that.data.total);
    if(ev.target.dataset.id){
      for(var i = 0; i < that.data.list.length; i++){
        that.data.list[i].goods.forEach(function(v){
          if(v.goods_id == ev.target.dataset.id){
            len = len + 1;
            total = total + parseFloat(v.goods_price);
            if (cart[ev.target.dataset.id]){
              cart[ev.target.dataset.id].sales+=1
            }else{
              cart[ev.target.dataset.id] = v;
              cart[ev.target.dataset.id].sales += 1
            }
            that.setData({
              cart:cart,
              cartLenth: len,
              total: total.toFixed(2)
            })
          }
        })
      }
    }
  },
  reduceCart:function(ev){
    var that = this;
    var cart = that.data.cart,
      len = that.data.cartLenth,
      total = 0;
    if (ev.target.dataset.id) {
      for(var k in cart){
        if (ev.target.dataset.id == cart[k].goods_id){
          cart[k].sales --;
          len -- ;
          if (cart[k].sales == 0){
            delete cart[k]
          }
        }
      }
    }
    for (var h in cart) {
      total += parseFloat(cart[h].goods_price)
    }
    that.setData({
      cart: cart,
      cartLenth: len,
      total: total.toFixed(2)
    })
  },
  clearCart:function(){
    this.setData({
      cart:{},
      cartLenth: 0,
      total:0
    })
  },
  balance:function(){
    var that = this;
    if (that.data.cartLenth == 0) return;
    wx.request({
      url: app.globalData.url + 'Order/mrPayNow',
      method:'POST',
      dataType:'JSON',
      data:{
        pro_id: config.pro_id,
        store: config.store,
        key: app.globalData.key,
        order_amount: that.data.total,
        pay_amount: that.data.total,
        pay_type: 1,
        cart: JSON.stringify(that.data.cart),
        table_id:194
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str)
        if(str.success == 1){
            wx.showModal({
              title: '提示',
              content: '支付成功',
              success:()=>{
                wx.navigateTo({
                  url: '../orderDetail/orderDetail?id='+str.responseData.order_id,
                })
              }
            })
        }
      },
      complete: () => {
        that.setData({
          selPay: 'display:none',
          cart: {},
          cartLenth: 0,
          total: 0
        })
      }
    })
  },
  wxPay:function(){
    var that = this;
    if (that.data.cartLenth == 0) return;
    wx.request({
      url: app.globalData.url + 'Order/mrPayNow',
      method: 'POST',
      dataType: 'JSON',
      data: {
        pro_id: config.pro_id,
        store: config.store,
        key: app.globalData.key,
        order_amount: that.data.total,
        pay_amount: that.data.total,
        pay_type: 3,
        cart: JSON.stringify(that.data.cart),
        table_id: 194
      },
      success: (res) => {
        var str = JSON.parse(res.data);
        console.log(str)
        if(str.success == 1){
          var order_id = str.responseData.order_id.order_id,
              dat = str.responseData.pay_data;
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
                  wx.navigateTo({
                    url: '../orderDetail/orderDetail?id='+order_id,
                  })
                }
              })
            },
            complete:()=>{
              that.setData({
                selPay:'display:none',
                cart: {},
                cartLenth: 0,
                total: 0
              })
            }
          })
          
        }
      }
    })
  }
})