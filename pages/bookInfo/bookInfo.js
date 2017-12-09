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

    deduct       : '0',
    integration  : '0',
    isIntegral   : false,
    activity     : [],
    activityPrice: '0.00',
    discountPrice: '0.00',
    mcardDeduct  : 0,
    integralPrice: 0,
    userName: '',
    changeUserPhone: '',
    bespeak_type: '1',
    isPay: false,
    isChecked: false,
    selectPayType: "-1",
    activityID: '',
    wallet: '0.00',
    isWallet: false,
    select_id: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
        user_id = options.user_id,
        now = new Date(),
        date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()),
        time = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()),
        activity = app.globalData.activity,
        hasfun = false,
        deduct = parseInt(app.globalData.gradeInfo.jf_toamount_deduct),
        integration = parseInt(app.globalData.gradeInfo.integration),
        isIntegral = false,
        mcardDeduct = 0;

    isIntegral = (integration > 0) ? false : true;

    if (!!(activity.length)) {
      hasfun = true;
      _this.sortActivity();
    }
    
    if (app.globalData.gradeInfo.mcard_deduct !== undefined) {
      mcardDeduct = app.globalData.gradeInfo.mcard_deduct * 10 / 1000;
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
      isIntegral : isIntegral,
      mcardDeduct: mcardDeduct,
      wallet     : app.globalData.gradeInfo.wallet
    });
    _this.bespeakExpertInfo();
    _this.sortActivity();
    _this.integral();
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
    var _this = this,
        couponID = _this.data.couponID;
    if (couponID === '') {
      this.fullReduce();
    } else {
      this.member();
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
  //获取技师信息
  bespeakExpertInfo: function() {
    var _this = this,
        url   = app.globalData.url,
        data  = {
          key      : app.globalData.key,
          pro_id   : config.pro_id,
          store    : config.store,
          expert_id: _this.data.expert_id
        };
    wx.request({
      url: url + 'Cosmetology/bespeakExpertInfo',
      data: data,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            avatar   : res.data.responseData.avatar,
            name     : res.data.responseData.name,
            sum      : res.data.responseData.sum,
            title    : res.data.responseData.title,
            goods    : res.data.responseData.goods,
            select_id: res.data.responseData.id
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
  //提交预约
  bespeakAdd: function() {
   
  },
  toUseCoupon: function() {
    var _this       = this,
        couponID    = _this.data.couponID,
        totalPrice  = _this.data.totalPrice;
    wx.navigateTo({
      url: '../useCoupon/useCoupon?couponID=' + couponID + '&totalPrice=' + totalPrice,
    });
  },
  //选择商品
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
      totalPrice : totalPrice,
      isChecked: false
    });
    _this.fullReduce();
    
  },
  //选择人数
  selectNums: function(e) {
    var _this      = this,
        selectNums = e.currentTarget.dataset.nums,
        totalPrice = _this.data.totalPrice,
        goodsPrice = _this.data.goodsPrice;

    _this.setData({
      selectNums: selectNums,
      totalPrice: count.multiply(selectNums, goodsPrice),
      isChecked: false
    });
    _this.fullReduce();
  },
  //选择日期
  bindDateChange: function(e) {
    var _this = this,
        date  = e.detail.value;
    _this.setData({
      date: date
    });
  },
  //选择时间
  bindTimeChange: function(e) {
    var _this = this,
        time  = e.detail.value;
    _this.setData({
      time: time
    });
  },
  //优惠活动按照满减的价格排序
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
        activityPrice = _this.data.activityPrice,
        totalPrice    = _this.data.totalPrice,
        activityID    = '';
    for (var item of activity) {
      if ((totalPrice - item.full_amount) > 0) {
        activityPrice = item.minus_amount;
        activityID    = item.activity_id;
        break;
      } else {
        activityPrice = '0.00';
        activityID    = '';
      }
    }

    _this.setData({
      activityPrice: activityPrice,
      payPrice: count.reduce(totalPrice, activityPrice),
      cachePayPrice: count.reduce(totalPrice, activityPrice),
      activityID: activityID,
      couponID: ''
    });
    _this.member();
  },
  //计算积分优惠
  integral: function() {
    var _this         = this,
        deduct        = parseInt(_this.data.deduct),
        integration   = parseInt(_this.data.integration),
        integralPrice = integration / deduct;
    _this.setData({
      integralPrice: integralPrice
    })
  },
  //计算会员折扣
  member: function() {
    var _this       = this,
        payPrice    = _this.data.payPrice,
        mcardDeduct = _this.data.mcardDeduct;
    if (!(mcardDeduct === 0)) {
      payPrice = (payPrice * mcardDeduct).toFixed(2);
    }
    _this.setData({
      payPrice: payPrice,
      cachePayPrice: payPrice,
      activityID: ''
    });
  },
  //是否选择积分
  switchChange: function(e) {
    var _this      = this,
        checked    = e.detail.value,
        payPrice   = _this.data.payPrice,
        totalPrice = _this.data.totalPrice,
        integralPrice = _this.data.integralPrice,
        cachePayPrice = null;
    if (checked) {
      if ((payPrice - integralPrice) >= 0) {
        payPrice = count.reduce(payPrice, integralPrice);
      } else {
        payPrice = 0;
      }
    } else {
      if ((payPrice - integralPrice) >= 0) {
        payPrice = count.add(payPrice, integralPrice);
      } else {
        payPrice = _this.data.cachePayPrice
      }
    }
    _this.setData({
      payPrice: payPrice
    });
  },
  //填写姓名
  changeUserName: function(e) {
    var _this = this,
        userName = e.detail.value;
    _this.setData({
      userName: userName
    })
  },
  //填写手机
  changeUserPhone: function(e) {
    var _this = this,
        userPhone = e.detail.value;
    console.log();
    _this.setData({
      userPhone: userPhone
    })
  },
  validate: function (data, regex, prompt) {
    for (var i of data) {
      if (!regex[i].test(data[i])) {
        wx.showModal({
          title: '',
          content: prompt[i],
        })
      }
    }
  },
  formSubmit: function(e) {
    var _this = this,
        userName = _this.data.userName,
        userPhone = _this.data.userPhone,
        selectGoods = _this.data.selectGoods,
        isWallet = (_this.data.wallet - _this.data.payPrice) > 0 ? true : false;
    console.log(_this.data.wallet, _this.data.payPrice)
    if (userName === '') {
      wx.showModal({
        title: '',
        content: '请输入姓名',
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(userPhone))) {
      wx.showModal({
        title: '',
        content: '请输入正确手机号',
      })
    } else if (JSON.stringify(selectGoods) === '{}'){
      wx.showModal({
        title: '',
        content: '请选择服务项目',
      })
    } else {
      _this.setData({
        formId: e.detail.formId,
        isPay: true,
        isWallet: isWallet
      });
    }
  },
  //关闭模态框
  closeModal: function(e) {
    var _this = this;

    _this.setData({
      isPay: false
    });
  },

  //微信支付
  payWeixin: function(e) {
    var _this = this,
        url = app.globalData.url,
        data = {
          pro_id: config.pro_id,
          store: config.store,
          key: app.globalData.key,
          phone: _this.data.userPhone,
          bespeak_type: _this.data.bespeak_type,
          select_id: _this.data.select_id,
          pay_amount: _this.data.payPrice,
          order_amount: _this.data.totalPrice,
          date: _this.data.date,
          time: _this.data.time,
          ref_id: Object.keys(_this.data.selectGoods).join(','),
          contacts: _this.data.userName,
          pnum: _this.data.selectNums,
          ticket: _this.data.couponID,
          activity_id: _this.data.activityID,
          formId: _this.data.formId,
          is_used_jf: _this.isChecked ? '1' : '0'
        };
    _this.setData({
      selectPayType: '1'
    })
    wx.request({
      url: url + 'Reserve/bespeakAdd',
      data: data,
      dataType: 'json',
      method: 'POST',
      success: (res) => {
        if(res.success === 1) {

        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      } 
    })
  },
  //余额支付
  payYue: function() {
    var _this = this,
      url = app.globalData.url,
      data = {
        pro_id: config.pro_id,
        store: config.store,
        key: app.globalData.key,
        phone: _this.data.userPhone,
        bespeak_type: _this.data.bespeak_type,
        select_id: _this.data.select_id,
        pay_amount: _this.data.payPrice,
        order_amount: _this.data.totalPrice,
        date: _this.data.date,
        time: _this.data.time,
        ref_id: Object.keys(_this.data.selectGoods).join(','),
        contacts: _this.data.userName,
        pnum: _this.data.selectNums,
        ticket: _this.data.couponID,
        activity_id: _this.data.activityID,
        formId: _this.data.formId,
        is_used_jf: _this.isChecked ? '1' : '0'
      };
    _this.setData({
      selectPayType: '2'
    })
    wx.request({
      url: url + 'Reserve/bespeakAdd',
      data: data,
      dataType: 'json',
      method: 'POST',
      success: (res) => {
        if (res.data.success === 1) {
          wx.redirectTo({
            url: '../orderDetail/orderDetail?id=' + res.data.responseData.order_id.order_id,
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    })
  }
})