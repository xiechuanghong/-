// pages/myCard/myCard.js
var app = getApp();
var config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasCard: 0,
    cardId: 0,
    logo: '',
    ba_cover: '',
    brand_name: '',
    qrcode: '',
    id: '',
    grade_name: '',
    code: '',
    isShowQcode: false,
    isInQcode: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    
    // _this.checkUserHasCard();
    // _this.getMyCardInfo();
    
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
    app.globalData.credit = false;
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
    var _this = this;
    _this.getMyCardInfo();
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
  checkUserHasCard: function() {
    var _this = this,
        key = app.globalData.key,
        url = app.globalData.url,
        pro_id = config.pro_id,
        store = config.store;
    wx.request({
      url: url + 'WxMemberCard/checkUserHasCard',
      dataType: 'json',
      data: {
        pro_id: pro_id,
        key: key,
        store: store,
      },
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          if (res.data.responseData === 0) {
            _this.setData({
              hasCard: 0,
            });
            _this.addCard();          
          } else {
            _this.setData({
              hasCard: res.data.responseData.code,
              cardId: res.data.responseData.card_id,
            });
            _this.openCard(res.data.responseData.card_id);
          }
        }
      }
    })
  },
  addCard: function() {
    console.log('---------------');
    var _this = this,
      url = app.globalData.url,
      key = app.globalData.key,
      pro_id = config.pro_id,
      store = config.store;
    wx.request({
      url: url + 'WxMemberCard/getCardExt',
      dataType: 'json',
      method: 'GET',
      data: {
        pro_id: pro_id,
        key: key,
        store: store
      },
      success: function (res) {
        var cardId  = res.data.responseData.card_id,
            cardExt = res.data.responseData.card_ext;
        if (res.data.success === 1) {
          wx.addCard({
            cardList: [{
              cardId: cardId,
              cardExt: cardExt
            }],
            success: function (res) {
              console.log(res.cardList[0].code);
              wx.request({
                url: url + 'WxMemberCard/saveCardEcode',
                dataType: 'json',
                data: {
                  pro_id: pro_id,
                  key: key,
                  store: store,
                  code: res.cardList[0].code,
                  card_id: cardId,
                },
                method: "POST",
                success: function(res) {
                  _this.setData({
                    hasCard: res.data.responseData
                  });
                  _this.openCard(cardId);
                }
              })
            },
            fail: function (message) {},
            complete: function (res) { },
          });
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }
    });
  },
  openCard: function (cardId) {
    var _this  = this,
        code   = _this.data.hasCard;
    wx.openCard({
      cardList: [{
        cardId: cardId,
        code: code
      }],
      success: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },
  myBalance:function(){
    wx.navigateTo({
      url: '../myBalance/myBalance',
    })
  },
  myGrade:function(){
    wx.navigateTo({
      url: '../myGrade/myGrade',
    })
  },
  myPoints:function(){
    wx.navigateTo({
      url: '../myPoints/myPoints',
    })
  },
  myMemberDetail:function(){
    var _this = this;
    wx.navigateTo({
      url: '../memberDetail/memberDetail?card_id=' + _this.data.cardId,
    })
  },
  getMyCardInfo: function() {
    var _this = this,
        pro_id = config.pro_id,
        store = config.store,
        key = app.globalData.key,
        url = app.globalData.url;
    wx.request({
      url: url + 'MemberCard/getMyCardInfo',
      dataType: 'json',
      data: {
        key: key,
        store: store,
        pro_id: pro_id
      },
      method: 'GET',
      success: function(res) {
        if (res.data.success === 1) {
          _this.setData({
            logo: res.data.responseData.logo,
            ba_cover: res.data.responseData.bg_cover,
            brand_name: res.data.responseData.brand_name,
            qrcode: res.data.responseData.qrcode,
            id: res.data.responseData.id,
            grade_name: res.data.responseData.grade_name,
            code: res.data.responseData.code,
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  },
  openCode: function() {
    var _this = this;
    _this.setData({
      isInQcode: true
    });
    setTimeout(function() {
      _this.setData({
        isShowQcode: true
      });
    }, 300);
  },
  bindCloseQcode: function() {
    var _this = this;
    _this.setData({
      isShowQcode: false
    });
    setTimeout(function () {
      _this.setData({
        isInQcode: false
      });
    }, 300);
  }
})