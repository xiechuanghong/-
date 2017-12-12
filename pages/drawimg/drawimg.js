/*
 * 2017-12-12
 * FFFFF
 */
const app = getApp();
const config = require("../../utils/config.js");
const ctx = wx.createCanvasContext('can');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.bg_cover);
    console.log(ctx)
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
  onShareAppMessage: function () {
    
  }
})

// // pages/drawimg/drawimg.js
// const app=getApp();
// const config=require("../../utils/config.js");
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     fn: null,
//     info:{},
//     wHeight: 607.5,
//     wWidth: 375
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     this.getShopInfo();
//     this.can = wx.createCanvasContext('can');
//     var that = this;
//     console.log(app.globalData);
//     wx.getSetting({
//       success(res) {
//         if (!res.authSetting['scope.writePhotosAlbum']) {
//           wx.authorize({
//             scope: 'scope.writePhotosAlbum',
//             success() {

//             }
//           })
//         }
//       }
//     })
//   },
//   drawcanvas:function(fun){
//     var that = this;
//     var wHeight = that.data.wHeight,
//       wWidth = that.data.wWidth;
//     if (app.globalData.avatarUrl==undefined){
//       setTimeout(function(){
//         that.drawcanvas();
//       },1000);
//       return;
//     }

//       var name = that.data.shop.shop_name,
//         img = app.globalData.avatarUrl,
//         qrcode = that.data.info.qrcode;
//       var ctx = that.can;//canvas
//       ctx.setFillStyle('#ffffff');

//       wx.downloadFile({
//         url: img, 
//         success: function (res) {
//           if (res.statusCode === 200) {
//             // console.log('t');
//             console.log(res.tempFilePath);
//             img = res.tempFilePath;
//           }
//         }
//       })
//       wx.downloadFile({
//         url: qrcode,
//         success: function (res) {
//           if (res.statusCode === 200) {
//             console.log(res.tempFilePath);
//             qrcode = res.tempFilePath;
//           }
//         }
//       })
      
//     var bgsrc = that.data.info.bg_cover,src;
//       wx.downloadFile({
//         url: bgsrc, 
//         success: function (res) {
//           if (res.statusCode === 200) {
//             console.log(res.tempFilePath);
//             src = res.tempFilePath;

//             setTimeout(function () {
//               var info = that.data.info;
//               console.log(src);
//               ctx.drawImage(src, 0, 0, 750, 1215);//背景
//               ctx.draw(true);
//               if (info.headimg_use == 1) {
//                 ctx.drawImage(img, info.headimg_left * 2, info.headimg_top * 2, 60 * 2, 60 * 2);//头像
//               }
//               setTimeout(function () {
//                 ctx.setFontSize(17 * 2);
//                 if (info.nickname_use==1){
//                   ctx.fillText(app.globalData.nickName, info.nickname_left * 2, info.nickname_top * 2);
//                 }
//                 ctx.setFontSize(14 * 2);
//                 ctx.fillText('我为' + name + '小程序代言', info.nickname_left * 2, (35 + parseFloat(info.nickname_top)) * 2);
//                 if (info.qrcode_use==1){
//                   ctx.drawImage(qrcode, info.qrcode_left * 2, info.qrcode_top * 2, 92 * 2, 92 * 2);
//                 }
//                 ctx.draw(true);
//               }, 1000);
//               setTimeout(() => {
//                 that.drawImg();
//               }, 2000);
//             }, 500);
//           }
//         }
//       })
    
//   },
//   drawImg:function(){
//     var that=this;
//     wx.canvasToTempFilePath({
//       x: 0,
//       y: 0,
//       width: 750,
//       height: 1215,
//       destWidth: 750,
//       destHeight: 1215,
//       canvasId: 'can',
//       success: function (res) {
//         console.log(res.tempFilePath)

//         wx:wx.hideLoading();

//         that.setData({
//           url:res.tempFilePath
//         })

//         wx.saveImageToPhotosAlbum({
//           filePath: res.tempFilePath,
//           success(res) {
//           }
//         })

//       }
//     })
//   },
//   getShopInfo: function () {//获取商家信息
//     var that = this;

//     wx:wx.showLoading({
//       title: '正在生成二维码',
//       mask: true,
//     })

//     wx.request({
//       url: app.globalData.url + 'Store/index?pro_id=' + config.pro_id + '&store=' + config.store + '&shop_id=0',
//       method: 'get',
//       success: (res) => {
//         console.log(res.data.responseData.shop_name);
//         that.setData({
//           shop:res.data.responseData
//         })
        
//         that.poster();
//       }
//     })
//   },
//   poster:function(){
//     var that=this;
//     if(app.globalData.key==undefined){
//       setTimeout(function(){
//         that.poster();
//       },1000);
//       return;
//     }
//     wx.request({
//       url: app.globalData.url +'Salesman/getPromotePoster',
//       method:'get',
//       dataType:'json',
//       data:{
//         pro_id:config.pro_id,
//         store:config.store,
//         key:app.globalData.key
//       },
//       success:(res)=>{
//         console.log(res);
//         if(res.data.success==1){
//           that.setData({
//             info: res.data.responseData
//           })
//           that.drawcanvas();
//         }
        
//       }
//     })
//   },
//   seCan:function(){
//     this.drawcanvas(this.drawImg);
//   },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
//     wx.stopPullDownRefresh();
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
//     var _this = this,
//         shopName = _this.data.shop.shop_name;
//     return {
//       title: '成为推广员',
//       desc: '扫码立马成为' + shopName + '推广员',
//       path: '/pages/loading/loading?pre_key=' + app.globalData.key + '&upper=' + app.globalData.nickName
//     }
//   }
// })
// pages/drawimg/drawimg.js