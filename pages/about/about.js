// pages/mine/mine.js
var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    stars: [false, false, false, false, false],
    key: 0,//评分
  },
  rating:function(){
    var arrStar = app.globalData.shop.star
    var arrStars = this.data.stars
    for (var i = 0; i < arrStar ; i ++){
      arrStars[i] = true      
   }
   this.setData({
     stars: arrStars
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shop: app.globalData.shop,
    })
    this.settingScope();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.rating()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.shop)
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
  settingScope:function(){
    var that = this;
    wx.getSetting({
      success:(res)=>{
        if (!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope: 'scope.userLocation',
            success:()=>{
              that.location();
            },
            fail:(re)=>{
              wx.openSetting({
                
              })
            }
          })
          // wx.openSetting({

          // })
        }
        that.location();
      }
    })
  },
  location:function(){
    var that = this;
    wx.getLocation({
      type:'gcj02',
      altitude:false,
      success: function(res) {
        console.log(res)
        if (res.errMsg == "getLocation:ok"){
          var la = res.latitude,
              lo = res.longitude;
          that.la = la;
          that.lo = lo;
          // that.openMap(la,lo)
        }else{
          wx.showModal({
            title: '提示',
            content: '获取位置信息失败',
            success:(res)=>{

            }
          })
        }
      },
    })
  },
  openMap:function(la,lo){
    var that = this;
    wx.openLocation({
      latitude: la,
      longitude: lo,
      scale:18,
      success:(res)=>{
        console.log(res)
      }
    })
  },
  gLocation:function(){
    this.openMap(this.la, this.lo);
  },
  callPhone:function(){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.shop.phone
    })
  }

})